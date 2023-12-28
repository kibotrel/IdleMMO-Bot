import experienceLevels from '../../data/levels.json' assert { type: 'json' }
import fishingTasks from '../../data/tasks/fishing.json' assert { type: 'json' }
import miningTasks from '../../data/tasks/mining.json' assert { type: 'json' }
import woodcuttingTasks from '../../data/tasks/woodcutting.json' assert { type: 'json' }
import type {
  LevelInformation,
  LevelsMap,
  SkillTasksMap,
} from '../types/maps.js'

import { SkillNames } from './enums.js'

export const skillTasks: SkillTasksMap = new Map()

skillTasks.set(SkillNames.Woodcutting, woodcuttingTasks)
skillTasks.set(SkillNames.Mining, miningTasks)
skillTasks.set(SkillNames.Fishing, fishingTasks)

export const levels: LevelsMap = new Map(
  experienceLevels as Array<[number, LevelInformation]>,
)
