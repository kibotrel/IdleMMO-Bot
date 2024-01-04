import { SlashCommandBuilder } from 'discord.js'

import {
  ActionDescriptions,
  ActionNames,
  OptionDescriptions,
  OptionNames,
  SkillNames,
} from '../../config/enums.js'

export const skillCalculatorCommand = new SlashCommandBuilder()
  .setName(ActionNames.SkillCalculator)
  .setDescription(ActionDescriptions.SkillCalculator)
  .addStringOption((option) => {
    return option
      .setName(OptionNames.SkillName)
      .setDescription(OptionDescriptions.SkillName)
      .addChoices(
        { name: 'Fishing', value: SkillNames.Fishing },
        { name: 'Mining', value: SkillNames.Mining },
        { name: 'Woodcutting', value: SkillNames.Woodcutting },
      )
      .setRequired(true)
  })
  .addIntegerOption((option) => {
    return option
      .setName(OptionNames.BaseLevel)
      .setDescription(OptionDescriptions.BaseLevel)
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(99)
  })
  .addIntegerOption((option) => {
    return option
      .setName(OptionNames.TargetLevel)
      .setDescription(OptionDescriptions.TargetLevel)
      .setMinValue(2)
      .setMaxValue(100)
  })
  .addNumberOption((option) => {
    return option
      .setName(OptionNames.ToolBonus)
      .setDescription(OptionDescriptions.ToolBonus)
      .addChoices(
        { name: 'None', value: 0 },
        { name: '5%', value: 0.05 },
        { name: '10%', value: 0.1 },
        { name: '15%', value: 0.15 },
        { name: '20%', value: 0.2 },
        { name: '25%', value: 0.25 },
        { name: '30%', value: 0.3 },
        { name: '35%', value: 0.35 },
        { name: '40%', value: 0.4 },
        { name: '50%', value: 0.5 },
      )
  })
  .addIntegerOption((option) => {
    return option
      .setName(OptionNames.BarteringLevel)
      .setDescription(OptionDescriptions.BarteringLevel)
      .setMinValue(1)
      .setMaxValue(100)
  })
  .addBooleanOption((option) => {
    return option
      .setName(OptionNames.IsMembershipActive)
      .setDescription(OptionDescriptions.IsMembershipActive)
  })
