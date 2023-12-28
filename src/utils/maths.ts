import {
  InternalError,
  UnprocessableContentError,
  pluralizeString,
} from 'discordbox'

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

export const millisecondsToTimeString = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))

  const daysString =
    days > 0 ? pluralizeString({ count: days, singular: 'day' }) : ''
  const hoursString =
    hours > 0 ? pluralizeString({ count: hours, singular: 'hour' }) : ''
  const minutesString =
    minutes > 0 ? pluralizeString({ count: minutes, singular: 'minute' }) : ''
  const secondsString =
    seconds > 0 ? pluralizeString({ count: seconds, singular: 'second' }) : ''

  return `${daysString} ${hoursString} ${minutesString} ${secondsString}`.trim()
}
