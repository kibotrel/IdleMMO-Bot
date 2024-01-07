import { InternalError, UnprocessableContentError } from 'discordbox'

import { ErrorMessages } from '../config/enums.js'
import { levels } from '../config/maps.js'

export const experienceBetweenLevels = (
  baseLevel: number,
  targetLevel: number,
  baseLevelRemainingExperience: number,
) => {
  if (!baseLevel || !targetLevel || baseLevel >= targetLevel) {
    throw new UnprocessableContentError(
      ErrorMessages.SkillCalulatorIncoherentLevels,
    )
  }

  const fromLevel = levels.get(baseLevel)
  const toLevel = levels.get(targetLevel)

  if (!fromLevel || !toLevel) {
    throw new InternalError(ErrorMessages.LevelInformationNotFound)
  }

  const totalExperience =
    toLevel.sumPreviousLevelsExperience - fromLevel.sumPreviousLevelsExperience

  if (!baseLevelRemainingExperience) {
    return totalExperience
  }

  const baseLevelCollectedExperience =
    fromLevel.levelExperience - baseLevelRemainingExperience

  return totalExperience - baseLevelCollectedExperience
}
