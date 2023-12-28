import type { SkillNames, StatisticNames } from '../config/enums.js'

export interface SkillTaskRewards {
  skillExperience: number
  statisticExperiences: Array<Partial<Record<StatisticNames, number>>>
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
  skillExperienceWithBonuses: number
}
export interface SkillTaskYield extends SkillTask {
  experiencePerHour: number
  goldPerHour: number
  rewards: SkillTaskRewardsYield
  timeToCompleteWithBonuses: number
}

export interface LevelInformation {
  levelExperience: number
  sumPreviousLevelsExperience: number
}

export type SkillTasksMap = Map<SkillNames, SkillTask[]>

export type LevelsMap = Map<number, LevelInformation>
