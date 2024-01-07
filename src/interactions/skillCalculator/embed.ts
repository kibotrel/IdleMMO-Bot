import type { APIEmbedField } from 'discord.js'
import { capitalizeString } from 'discordbox'

import { baseEmded } from '../../config/embeds.js'
import { SkillCalculatorSortingStrategies } from '../../config/enums.js'
import { bonusEssences } from '../../config/maps.js'
import type { SkillCalculatorResultsEmbedData } from '../../types/embeds.js'
import { emptyField } from '../../utils/embeds.js'

const strategyField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  if (
    data.sortingStrategy === SkillCalculatorSortingStrategies.ExperiencePerHour
  ) {
    return {
      name: ':sparkles: XP/Hour',
      value: data.tasks.experiencePerHour
        .map((entry) => {
          return entry.toLocaleString('en')
        })
        .join('\n'),
      inline: true,
    }
  }

  return {
    name: ':coin: Gold/Hour',
    value: data.tasks.goldPerHour
      .map((entry) => {
        return entry.toLocaleString('en')
      })
      .join('\n'),
    inline: true,
  }
}

const timeEstimateField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  return {
    name: `:clock4: Time from level ${data.baseLevel} to level ${data.targetLevel}`,
    value: [data.timeToTargetLevel, '\u200B'].join('\n'),
    inline: true,
  }
}

const barteringLevelField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  return {
    name: '<:bartering:1193613627060670584> Bartering level',
    value: data.barteringLevel.toLocaleString('en'),
    inline: true,
  }
}

const taskNamesField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  return {
    name: ':hourglass_flowing_sand: Tasks',
    value: [...data.tasks.names, '\u200B'].join('\n'),
    inline: true,
  }
}

const toolBonusField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  const toolBonus = data.toolBonus * 100

  return {
    name: ':tools: Tool bonus',
    value: toolBonus ? `${toolBonus.toLocaleString('en')}%` : 'None',
    inline: true,
  }
}

const membershipField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  return {
    name: '<:membership:1193614365396574269> Membership',
    value: data.isMembershipActive ? 'Active' : 'Inactive',
    inline: true,
  }
}

const itemYieldField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  return {
    name: ':package: Items/Hour',
    value: data.tasks.itemsPerHour
      .map((entry) => {
        return entry.toLocaleString('en')
      })
      .join('\n'),
    inline: true,
  }
}

const essenceBonusField = (
  data: SkillCalculatorResultsEmbedData,
): APIEmbedField => {
  const essenceBonus = bonusEssences.get(data.bonusEssence)

  return {
    name: '<:essence_crystal:1193612328613191821> Essence bonus',
    value: essenceBonus ? `Tier ${data.bonusEssence}` : 'None',
    inline: true,
  }
}

export const skillCalculatorResultsEmbed = (
  data: SkillCalculatorResultsEmbedData,
) => {
  return baseEmded()
    .setTitle(`Skill Calculator | ${capitalizeString(data.skillName)}`)
    .setDescription(
      `Tasks are sorted by **XP/hour** rate in descending order. Time is computed assuming you run the most efficient task for the whole duration.\n\u200B`,
    )
    .setFields([
      timeEstimateField(data),
      barteringLevelField(data),
      emptyField(),
      taskNamesField(data),
      itemYieldField(data),
      strategyField(data),
      toolBonusField(data),
      essenceBonusField(data),
      membershipField(data),
    ])
}
