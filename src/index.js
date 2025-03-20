import app from '../app.js'
import { config } from './config/serverConfig.js'

const PORT = config.port
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on ${config.fullUrl}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
  }
}
startServer()
