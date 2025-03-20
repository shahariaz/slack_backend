import dotenv from "dotenv";
dotenv.config();

class ServerConfig {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.host = process.env.HOST || "localhost";
    this.protocol = process.env.PROTOCOL || "http";
    this.basePath = process.env.BASE_PATH || "/";
    this.apiVersion = process.env.API_VERSION || "v1";
    this.apiPrefix = `${this.basePath}${this.apiVersion}`;
    this.validate();
  }

  get fullUrl() {
    return `${this.protocol}://${this.host}:${this.port}${this.apiPrefix}`;
  }
  validate() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined || value === null) {
        throw new Error(`Missing configuration for ${key}`);
      }
    }
  }
}

export const config = new ServerConfig();
