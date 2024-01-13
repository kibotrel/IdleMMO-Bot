import type { CommandInteraction } from 'discord.js'
import type { InteractionMetadata } from 'discordbox'
import {
  InternalError,
  NotFoundError,
  UnprocessableContentError,
  millisecondsToTimeString,
  objectWithCamelCaseKeys,
} from 'discordbox'

import {
  Constants,
  ErrorMessages,
  SkillCalculatorSortingStrategies,
} from '../../config/enums.js'
import { bonusEssences, skillTasks } from '../../config/maps.js'
import type { SkillCalculatorResultsEmbedData } from '../../types/embeds.js'
import type {
  SkillCalculatorArguments,
  SkillCalculatorTaskBonuses,
} from '../../types/interactions.js'
import type {
  SkillTask,
  SkillTaskRewards,
  SkillTaskRewardsYield,
  SkillTaskYield,
} from '../../types/maps.js'
import { experienceBetweenLevels } from '../../utils/maths.js'
import { snakeCaseToCamelCaseString } from '../../utils/strings.js'

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

  if (commandArguments.bonusEssence) {
    const bonusEssence = bonusEssences.get(commandArguments.bonusEssence)

    if (bonusEssence) {
      taskBonuses.bonusExperienceRatio += bonusEssence.experience
      taskBonuses.reductionTimeRatio += bonusEssence.efficiency
    }
  }

  return taskBonuses
}

const computeRankedTasks = (
  tasks: SkillTask[],
  taskBonuses: SkillCalculatorTaskBonuses,
  sortingStrategy: SkillCalculatorSortingStrategies,
): SkillTaskYield[] => {
  const sortingKey =
    snakeCaseToCamelCaseString<
      Exclude<
        keyof SkillTaskRewardsYield,
        keyof SkillTaskRewards | 'itemsPerHour'
      >
    >(sortingStrategy)

  return tasks
    .map((task): SkillTaskYield => {
      const timeToCompleteWithBonuses =
        task.timeToComplete / (1 + taskBonuses.reductionTimeRatio)
      const skillExperienceWithBonuses = Math.floor(
        task.rewards.skillExperience * taskBonuses.bonusExperienceRatio,
      )

      const goldCost = task.goldCost ?? 0

      const itemsPerHour = Math.floor(
        Constants.MillisecondsInHour / timeToCompleteWithBonuses,
      )
      const skillExperiencePerHour = itemsPerHour * skillExperienceWithBonuses
      const goldPerHour =
        itemsPerHour *
        (Math.round(task.rewards.vendorGold * taskBonuses.barteringRatio) -
          goldCost)

      const defenceExperiencePerHour =
        itemsPerHour * (task.rewards.statisticExperiences.defence ?? 0)
      const dexterityExperiencePerHour =
        itemsPerHour * (task.rewards.statisticExperiences.dexterity ?? 0)
      const strengthExperiencePerHour =
        itemsPerHour * (task.rewards.statisticExperiences.strength ?? 0)
      const speedExperiencePerHour =
        itemsPerHour * (task.rewards.statisticExperiences.speed ?? 0)

      return {
        ...task,
        rewards: {
          ...task.rewards,
          defenceExperiencePerHour,
          dexterityExperiencePerHour,
          goldPerHour,
          itemsPerHour,
          skillExperiencePerHour,
          speedExperiencePerHour,
          strengthExperiencePerHour,
        },
        skillExperienceWithBonuses,
        timeToCompleteWithBonuses,
      }
    })
    .sort((a, b) => {
      return b.rewards[sortingKey] - a.rewards[sortingKey]
    })
}

const prepareDataForEmbed = (
  commandArguments: SkillCalculatorArguments,
  rankedTasks: SkillTaskYield[],
  sortingStrategy: SkillCalculatorSortingStrategies,
) => {
  const embedData: SkillCalculatorResultsEmbedData = {
    barteringLevel: commandArguments.barteringLevel ?? 1,
    baseLevel: commandArguments.baseLevel,
    bonusEssence: commandArguments.bonusEssence ?? 0,
    isMembershipActive: commandArguments.isMembershipActive ?? false,
    skillName: commandArguments.skillName,
    sortingStrategy,
    targetLevel: commandArguments.targetLevel,
    tasks: {
      defenceExperiencePerHour: [],
      dexterityExperiencePerHour: [],
      goldPerHour: [],
      names: [],
      itemsPerHour: [],
      skillExperiencePerHour: [],
      speedExperiencePerHour: [],
      strengthExperiencePerHour: [],
    },
    timeToTargetLevel: '',
    toolBonus: commandArguments.toolBonus ?? 0,
  }

  for (const task of rankedTasks) {
    embedData.tasks.defenceExperiencePerHour.push(
      task.rewards.defenceExperiencePerHour,
    )
    embedData.tasks.dexterityExperiencePerHour.push(
      task.rewards.dexterityExperiencePerHour,
    )
    embedData.tasks.skillExperiencePerHour.push(
      task.rewards.skillExperiencePerHour,
    )
    embedData.tasks.goldPerHour.push(task.rewards.goldPerHour)
    embedData.tasks.itemsPerHour.push(task.rewards.itemsPerHour)
    embedData.tasks.names.push(`${task.emoji} ${task.label}`)
    embedData.tasks.speedExperiencePerHour.push(
      task.rewards.speedExperiencePerHour,
    )
    embedData.tasks.strengthExperiencePerHour.push(
      task.rewards.strengthExperiencePerHour,
    )
  }

  const experienceToGain = experienceBetweenLevels(
    commandArguments.baseLevel,
    commandArguments.targetLevel,
    commandArguments.baseLevelRemainingExperience,
  )
  const bestTask = rankedTasks.at(0)

  if (!bestTask) {
    throw new InternalError(ErrorMessages.SkillCalculatorNoOutputTaskAvailable)
  }

  const numberOfItemsNeeded = Math.ceil(
    experienceToGain / bestTask.skillExperienceWithBonuses,
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
  const sortingStrategy =
    commandArguments.sortingStrategy ??
    SkillCalculatorSortingStrategies.SkillExperiencePerHour

  const rankedTasks = computeRankedTasks(
    doableTasks,
    taskBonuses,
    sortingStrategy,
  )
  const embedData = prepareDataForEmbed(
    commandArguments,
    rankedTasks,
    sortingStrategy,
  )

  await interaction.reply({
    embeds: [skillCalculatorResultsEmbed(embedData)],
    ephemeral: true,
  })
}
