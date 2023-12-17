import { bot } from './config/dependencies.js'
import { interactions } from './interactions/index.js'

bot.addGenericInteractions(interactions)

await bot.start()
