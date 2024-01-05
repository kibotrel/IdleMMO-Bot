import type {
  SkillCalculatorSortingStrategies,
  SkillNames,
} from '../config/enums.js'

export interface SkillCalculatorResultsEmbedData {
  barteringLevel: number
  baseLevel: number
  isMembershipActive: boolean
  skillName: SkillNames
  sortingStrategy: SkillCalculatorSortingStrategies
  targetLevel: number
  tasks: {
    experiencePerHour: number[]
    goldPerHour: number[]
    itemsPerHour: number[]
    names: string[]
  }
  timeToTargetLevel: string
  toolBonus: number
}
