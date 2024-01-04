import { InternalError, UnprocessableContentError } from 'discordbox'

import { ErrorMessages } from '../config/enums.js'
import { levels } from '../config/maps.js'

export const experienceBetweenLevels = (
  baseLevel: number,
  targetLevel: number,
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

  return (
    toLevel.sumPreviousLevelsExperience - fromLevel.sumPreviousLevelsExperience
  )
}
