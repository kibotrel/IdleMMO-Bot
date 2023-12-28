import type { CustomIdParts } from 'discordbox'
import { randomString } from 'discordbox'

export const generateCustomId = <ActionNames>(
  actionName: ActionNames,
  options: Partial<CustomIdParts> = {},
) => {
  const { previousRequestId = '', additionalData = '' } = options
  const uniqueId = randomString()

  return `${actionName}:${uniqueId}:${previousRequestId}:${additionalData}`
}
