import essenceTiers from '../../data/essences.json' assert { type: 'json' }
import experienceLevels from '../../data/levels.json' assert { type: 'json' }
import fishingTasks from '../../data/tasks/fishing.json' assert { type: 'json' }
import miningTasks from '../../data/tasks/mining.json' assert { type: 'json' }
import woodcuttingTasks from '../../data/tasks/woodcutting.json' assert { type: 'json' }
import type {
  BonusEssence,
  LevelInformation,
  SkillTask,
} from '../types/maps.js'

import { SkillNames } from './enums.js'

export const skillTasks = new Map<SkillNames, SkillTask[]>([
  [SkillNames.Fishing, fishingTasks],
  [SkillNames.Mining, miningTasks],
  [SkillNames.Woodcutting, woodcuttingTasks],
])

export const levels = new Map<number, LevelInformation>(
  experienceLevels as Array<[number, LevelInformation]>,
)

export const bonusEssences = new Map<number, BonusEssence>(
  essenceTiers as Array<[number, BonusEssence]>,
)
