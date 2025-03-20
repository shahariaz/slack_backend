import dotenv from 'dotenv'
dotenv.config()

class ServerConfig {
  constructor() {
    this.port = process.env.PORT
    this.host = process.env.HOST
    this.protocol = process.env.PROTOCOL
    this.basePath = process.env.BASE_PATH
    this.apiVersion = process.env.API_VERSION
    this.apiPrefix = `${this.basePath}${this.apiVersion}`
    this.nodeEnv = process.env.NODE_ENV
    this.dbUri = process.env.DB_URI
    this.validate()
  }

  get fullUrl() {
    return `${this.protocol}://${this.host}:${this.port}${this.apiPrefix}`
  }
  validate() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined || value === null) {
        throw new Error(`Missing configuration for ${key}`)
      }
    }
  }
}

export const config = new ServerConfig()
