import type {
  SkillCalculatorSortingStrategies,
  SkillNames,
} from '../config/enums.js'

export interface SkillCalculatorArguments {
  barteringLevel: number
  baseLevel: number
  baseLevelRemainingExperience: number
  bonusEssence: number
  isMembershipActive: boolean
  skillName: SkillNames
  sortingStrategy: SkillCalculatorSortingStrategies
  targetLevel: number
  toolBonus: number
}

export interface SkillCalculatorTaskBonuses {
  barteringRatio: number
  bonusExperienceRatio: number
  reductionTimeRatio: number
}
