import type { InteractionHandler } from 'discordbox'

import { skillCalculator } from './skillCalculator/interaction.js'

export const interactions: InteractionHandler[] = [skillCalculator]
