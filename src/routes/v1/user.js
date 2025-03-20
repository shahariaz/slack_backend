import express from 'express'

const router = express.Router()
router.get('/user', (_, res) => {
  res.status(200).json({
    message: 'user'
  })
})
export default router
