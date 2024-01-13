import type {
  SkillCalculatorSortingStrategies,
  SkillNames,
} from '../config/enums.js'

export interface SkillCalculatorResultsEmbedData {
  barteringLevel: number
  baseLevel: number
  bonusEssence: number
  isMembershipActive: boolean
  skillName: SkillNames
  sortingStrategy: SkillCalculatorSortingStrategies
  targetLevel: number
  tasks: {
    defenceExperiencePerHour: number[]
    dexterityExperiencePerHour: number[]
    goldPerHour: number[]
    itemsPerHour: number[]
    skillExperiencePerHour: number[]
    names: string[]
    speedExperiencePerHour: number[]
    strengthExperiencePerHour: number[]
  }
  timeToTargetLevel: string
  toolBonus: number
}
