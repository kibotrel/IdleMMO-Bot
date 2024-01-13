import type { StatisticNames } from '../config/enums.js'

export interface SkillTaskRewards {
  skillExperience: number
  statisticExperiences: { [key in StatisticNames]?: number }
  vendorGold: number
}

export interface SkillTask {
  emoji: string
  label: string
  minimumLevel: number
  name: string
  rewards: SkillTaskRewards
  /** Expressed in milliseconds */
  timeToComplete: number
  goldCost?: number
}

export interface SkillTaskRewardsYield extends SkillTaskRewards {
  defenceExperiencePerHour: number
  dexterityExperiencePerHour: number
  goldPerHour: number
  itemsPerHour: number
  skillExperiencePerHour: number
  speedExperiencePerHour: number
  strengthExperiencePerHour: number
}
export interface SkillTaskYield extends SkillTask {
  skillExperienceWithBonuses: number
  rewards: SkillTaskRewardsYield
  timeToCompleteWithBonuses: number
}

export interface LevelInformation {
  levelExperience: number
  sumPreviousLevelsExperience: number
}

export interface BonusEssence {
  efficiency: number
  experience: number
}
