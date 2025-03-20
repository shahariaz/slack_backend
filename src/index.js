import app from './app.js'
import { config } from './config/serverConfig.js'
import dbStart from './config/dbConfig.js'
const PORT = config.port
const startServer = async () => {
  try {
    await dbStart().then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on ${config.fullUrl}`)
      })
    })
  } catch (error) {
    console.error('Error starting server:', error)
  }
}
startServer()
