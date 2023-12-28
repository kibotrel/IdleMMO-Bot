export const enum ActionDescriptions {
  SkillCalculator = 'Compute what it takes to reach a certain skill level.',
}

export const enum ActionNames {
  SkillCalculator = 'skill_calculator',
}

export const enum ErrorMessages {
  LevelInformationNotFound = 'Level information could not be found.',
  SkillCalulatorIncoherentLevels = 'Target level must be higher than the base level.',
  SkillCalculatorSkillNotYetImplemented = 'Skill is not yet implemented.',
  SlashCommandArgumentsMalformed = 'Slash command arguments are malformed.',
}

export const enum OptionDescriptions {
  BarteringLevel = "Level you're currently at in bartering.",
  BaseLevel = 'Level you are starting from.',
  IsMembershipActive = 'Whether or not you have an active membership.',
  SkillName = 'Skill you want compute for',
  TargetLevel = 'Level you want to reach.',
  ToolBonus = 'Bonus in percent granted by your currently equiped tool.',
}

export const enum OptionNames {
  BarteringLevel = 'bartering_level',
  BaseLevel = 'base_level',
  IsMembershipActive = 'is_membership_active',
  SkillName = 'skill_name',
  TargetLevel = 'target_level',
  ToolBonus = 'tool_bonus',
}

export const enum SkillNames {
  Alchemy = 'alchemy',
  Cooking = 'cooking',
  Fishing = 'fishing',
  Forge = 'forge',
  Mining = 'mining',
  Smelting = 'smelting',
  Woodcutting = 'woodcutting',
}

export const enum StatisticNames {
  Defence = 'defence',
  Dexterity = 'dexterity',
  Speed = 'speed',
  Strength = 'strength',
}

export const enum ToolReductions {
  None = 0,
  FivePercent = 0.05,
  TenPercent = 0.1,
  FifhteenPercent = 0.15,
  TwentyPercent = 0.2,
  TwentyFivePercent = 0.25,
  ThirtyPercent = 0.3,
  ThirtyFivePercent = 0.35,
  FourtyPercent = 0.4,
  FiftyPercent = 0.5,
}

export const enum Constants {
  BarteringRatePerLevel = 0.003,
  MembershipExperienceBonusRate = 0.15,
  MembershipTimeRedictionRate = 0.1,
  MillisecondsInHour = 3_600_000,
}
