import { SlashCommandBuilder } from 'discord.js'

import {
  ActionDescriptions,
  ActionNames,
  OptionDescriptions,
  OptionNames,
  SkillNames,
  ToolReductions,
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
        { name: 'None', value: ToolReductions.None },
        { name: '5%', value: ToolReductions.FivePercent },
        { name: '10%', value: ToolReductions.TenPercent },
        { name: '15%', value: ToolReductions.FifhteenPercent },
        { name: '20%', value: ToolReductions.TwentyPercent },
        { name: '25%', value: ToolReductions.TwentyFivePercent },
        { name: '30%', value: ToolReductions.ThirtyPercent },
        { name: '35%', value: ToolReductions.ThirtyFivePercent },
        { name: '40%', value: ToolReductions.FourtyPercent },
        { name: '50%', value: ToolReductions.FiftyPercent },
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
