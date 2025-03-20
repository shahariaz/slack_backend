import mongoose from 'mongoose'

import { config } from './serverConfig.js'

export default async function dbStart() {
  try {
    if (config.nodeEnv === 'development') {
      await mongoose.connect(config.dbUri)
      console.log('Database connection established in development mode')
    } else if (config.nodeEnv === 'production') {
      console.log('Database connection established in production mode')
    }
  } catch (error) {
    console.log('Database connection error:', error)
  }
}
