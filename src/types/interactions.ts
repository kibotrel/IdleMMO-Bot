import type { SkillNames } from '../config/enums.js'

export interface SkillCalculatorArguments {
  barteringLevel: number
  baseLevel: number
  baseLevelRemainingExperience: number
  isMembershipActive: boolean
  skillName: SkillNames
  targetLevel: number
  toolBonus: number
}

export interface SkillCalculatorTaskBonuses {
  barteringRatio: number
  bonusExperienceRatio: number
  reductionTimeRatio: number
}
