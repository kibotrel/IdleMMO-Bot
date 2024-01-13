export const enum ActionDescriptions {
  SkillCalculator = 'Compute what it takes to reach a certain skill level.',
}

export const enum ActionNames {
  SkillCalculator = 'skill_calculator',
}

export const enum ErrorMessages {
  LevelInformationNotFound = 'Level information could not be found.',
  SkillCalulatorIncoherentLevels = 'Target level must be higher than the base level.',
  SkillCalculatorNoOutputTaskAvailable = 'No output task available.',
  SkillCalculatorSkillNotYetImplemented = 'Skill is not yet implemented.',
  SlashCommandArgumentsMalformed = 'Slash command arguments are malformed.',
}

export const enum OptionDescriptions {
  BarteringLevel = "Level you're currently at in bartering.",
  BaseLevel = 'Level you are starting from.',
  BaseLevelRemainingExperience = 'Remaining experience to reach the next level.',
  BonusEssence = 'Additional essence you want to use.',
  IsMembershipActive = 'Whether or not you have an active membership.',
  SkillName = 'Skill you want compute for',
  SortingStrategy = 'Strategy used to sort tasks.',
  TargetLevel = 'Level you want to reach.',
  ToolBonus = 'Bonus in percent granted by your currently equiped tool.',
}

export const enum OptionNames {
  BarteringLevel = 'bartering_level',
  BaseLevel = 'base_level',
  BaseLevelRemainingExperience = 'base_level_remaining_experience',
  BonusEssence = 'bonus_essence',
  IsMembershipActive = 'is_membership_active',
  SkillName = 'skill_name',
  SortingStrategy = 'sorting_strategy',
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

export const enum SkillCalculatorSortingStrategies {
  DefenceExperiencePerHour = 'defence_experience_per_hour',
  DexterityExperiencePerHour = 'dexterity_experience_per_hour',
  GoldPerHour = 'gold_per_hour',
  SkillExperiencePerHour = 'skill_experience_per_hour',
  SpeedExperiencePerHour = 'speed_experience_per_hour',
  StrengthExperiencePerHour = 'strength_experience_per_hour',
}

export const enum StatisticNames {
  Defence = 'defence',
  Dexterity = 'dexterity',
  Speed = 'speed',
  Strength = 'strength',
}

export const enum Constants {
  BarteringRatePerLevel = 0.003,
  MembershipExperienceBonusRate = 0.15,
  MembershipTimeRedictionRate = 0.1,
  MillisecondsInHour = 3_600_000,
}
