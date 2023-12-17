import { SlashCommandBuilder } from 'discord.js'
import type { InteractionHandler } from 'discordbox'

export const ping: InteractionHandler = {
  action: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('sends Pong!'),

  callback: async (interaction) => {
    await interaction.reply({ content: 'Pong!', ephemeral: true })
  },
}
