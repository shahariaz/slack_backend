import cookieParser from 'cookie-parser'
import express from 'express'
import httpStatus from 'http-status-codes'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/v1/ping', (_, res) => {
  res.status(httpStatus.OK).json({
    message: 'pong'
  })
})

export default app
