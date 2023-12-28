import type { SkillNames } from '../config/enums.js'

export interface SkillCalculatorResultsEmbedData {
  barteringLevel: number
  baseLevel: number
  isMembershipActive: boolean
  skillName: SkillNames
  targetLevel: number
  tasks: {
    experiencePerHour: number[]
    goldPerHour: number[]
    names: string[]
  }
  timeToTargetLevel: string
  toolBonus: number
}
