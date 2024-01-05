import type { APIEmbedField } from 'discord.js'
import { capitalizeString } from 'discordbox'

import { baseEmded } from '../../config/embeds.js'
import { SkillCalculatorSortingStrategies } from '../../config/enums.js'
import type { SkillCalculatorResultsEmbedData } from '../../types/embeds.js'

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

export const skillCalculatorResultsEmbed = (
  data: SkillCalculatorResultsEmbedData,
) => {
  return baseEmded()
    .setTitle(`Skill Calculator | ${capitalizeString(data.skillName)}`)
    .setDescription(
      `Tasks are sorted by **XP/hour** rate in descending order. Time is computed assuming you run the most efficient task for the whole duration.\n\u200B`,
    )
    .setFields([
      {
        name: `:clock4: Time from level ${data.baseLevel} to level ${data.targetLevel}`,
        value: [data.timeToTargetLevel, '\u200B'].join('\n'),
        inline: true,
      },
      {
        name: ':scales: Bartering level',
        value: data.barteringLevel.toLocaleString('en'),
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
      {
        name: ':hourglass_flowing_sand: Tasks',
        value: [...data.tasks.names, '\u200B'].join('\n'),
        inline: true,
      },
      {
        name: ':package: Items/Hour',
        value: data.tasks.itemsPerHour
          .map((entry) => {
            return entry.toLocaleString('en')
          })
          .join('\n'),
        inline: true,
      },
      strategyField(data),
      {
        name: ':tools: Tool bonus',
        value: `${(data.toolBonus * 100).toLocaleString('en')}%`,
        inline: true,
      },
      {
        name: ':crown: Membership',
        value: data.isMembershipActive ? 'Active' : 'Inactive',
        inline: true,
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true,
      },
    ])
}
