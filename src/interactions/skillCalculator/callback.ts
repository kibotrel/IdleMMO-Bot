import type { CommandInteraction } from 'discord.js'
import type { InteractionMetadata } from 'discordbox'
import {
  InternalError,
  NotFoundError,
  UnprocessableContentError,
  millisecondsToTimeString,
  objectWithCamelCaseKeys,
} from 'discordbox'

import { Constants, ErrorMessages } from '../../config/enums.js'
import { skillTasks } from '../../config/maps.js'
import type { SkillCalculatorResultsEmbedData } from '../../types/embeds.js'
import type {
  SkillCalculatorArguments,
  SkillCalculatorTaskBonuses,
} from '../../types/interactions.js'
import type { SkillTask, SkillTaskYield } from '../../types/maps.js'
import { experienceBetweenLevels } from '../../utils/maths.js'

import { skillCalculatorResultsEmbed } from './embed.js'

const computeTaskBonuses = (commandArguments: SkillCalculatorArguments) => {
  const taskBonuses: SkillCalculatorTaskBonuses = {
    barteringRatio: 1,
    bonusExperienceRatio: 1,
    reductionTimeRatio: 0,
  }

  if (commandArguments.barteringLevel) {
    taskBonuses.barteringRatio +=
      commandArguments.barteringLevel * Constants.BarteringRatePerLevel
  }

  if (commandArguments.toolBonus) {
    taskBonuses.reductionTimeRatio += commandArguments.toolBonus
  }

  if (commandArguments.isMembershipActive) {
    taskBonuses.bonusExperienceRatio += Constants.MembershipExperienceBonusRate
    taskBonuses.reductionTimeRatio += Constants.MembershipTimeRedictionRate
  }

  return taskBonuses
}

const computeRankedTasks = (
  tasks: SkillTask[],
  taskBonuses: SkillCalculatorTaskBonuses,
): SkillTaskYield[] => {
  return tasks
    .map((task) => {
      /**
       * We divide by 2 because the percieved efficiency on the UI is doubled.
       * This is a hacky way to account for that.
       */
      const timeToCompleteWithBonuses =
        task.timeToComplete * (1 - taskBonuses.reductionTimeRatio / 2)

      const itemsPerHour = Math.floor(
        Constants.MillisecondsInHour / timeToCompleteWithBonuses,
      )

      const skillExperienceWithBonuses = Math.floor(
        task.rewards.skillExperience * taskBonuses.bonusExperienceRatio,
      )
      const experiencePerHour = itemsPerHour * skillExperienceWithBonuses

      const goldCost = task.goldCost ?? 0
      const goldPerHour =
        itemsPerHour *
        (Math.round(task.rewards.vendorGold * taskBonuses.barteringRatio) -
          goldCost)

      return {
        ...task,
        experiencePerHour,
        goldPerHour,
        rewards: {
          ...task.rewards,
          skillExperienceWithBonuses,
        },
        timeToCompleteWithBonuses,
      }
    })
    .sort((a, b) => {
      return b.experiencePerHour - a.experiencePerHour
    })
}

const prepareDataForEmbed = (
  commandArguments: SkillCalculatorArguments,
  rankedTasks: SkillTaskYield[],
) => {
  const embedData: SkillCalculatorResultsEmbedData = {
    barteringLevel: commandArguments.barteringLevel ?? 1,
    baseLevel: commandArguments.baseLevel,
    isMembershipActive: commandArguments.isMembershipActive ?? false,
    skillName: commandArguments.skillName,
    targetLevel: commandArguments.targetLevel,
    tasks: {
      experiencePerHour: [],
      goldPerHour: [],
      names: [],
    },
    timeToTargetLevel: '',
    toolBonus: commandArguments.toolBonus ?? 0,
  }

  for (const task of rankedTasks) {
    embedData.tasks.names.push(`${task.emoji} ${task.label}`)
    embedData.tasks.experiencePerHour.push(task.experiencePerHour)
    embedData.tasks.goldPerHour.push(task.goldPerHour)
  }

  const experienceToGain = experienceBetweenLevels(
    commandArguments.baseLevel,
    commandArguments.targetLevel,
    commandArguments.baseLevelRemainingExperience,
  )
  const bestTask = rankedTasks.at(0) as SkillTaskYield
  const numberOfItemsNeeded = Math.ceil(
    experienceToGain / bestTask.rewards.skillExperienceWithBonuses,
  )

  embedData.timeToTargetLevel = millisecondsToTimeString(
    numberOfItemsNeeded * bestTask.timeToCompleteWithBonuses,
  )

  return embedData
}

export const skillCalculatorCallback = async (
  interaction: CommandInteraction,
  metadata: InteractionMetadata,
) => {
  const commandArguments = objectWithCamelCaseKeys<SkillCalculatorArguments>(
    metadata.commandArguments,
  )

  if (!commandArguments) {
    throw new InternalError(ErrorMessages.SlashCommandArgumentsMalformed)
  }

  if (!commandArguments.targetLevel) {
    commandArguments.targetLevel = commandArguments.baseLevel + 1
  }

  if (commandArguments.baseLevel >= commandArguments.targetLevel) {
    throw new UnprocessableContentError(
      ErrorMessages.SkillCalulatorIncoherentLevels,
    )
  }

  const tasks = skillTasks.get(commandArguments.skillName)

  if (!tasks) {
    throw new NotFoundError(ErrorMessages.SkillCalculatorSkillNotYetImplemented)
  }

  const doableTasks = tasks.filter((task) => {
    return task.minimumLevel <= commandArguments.baseLevel
  })
  const taskBonuses = computeTaskBonuses(commandArguments)
  const rankedTasks = computeRankedTasks(doableTasks, taskBonuses)
  const embedData = prepareDataForEmbed(commandArguments, rankedTasks)

  await interaction.reply({
    embeds: [skillCalculatorResultsEmbed(embedData)],
    ephemeral: true,
  })
}
