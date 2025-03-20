import cookieParser from 'cookie-parser'
import express from 'express'
import httpStatus from 'http-status-codes'

import apiRoutes from './routes/apiRoutes.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Route Setup
app.use('/api', apiRoutes)

app.get('/api/v1/ping', (_, res) => {
  res.status(httpStatus.OK).json({
    message: 'pong'
  })
})

export default app
