import type { APIEmbedField } from 'discord.js'

export const emptyField = (): APIEmbedField => {
  return { name: '\u200B', value: '\u200B', inline: true }
}
