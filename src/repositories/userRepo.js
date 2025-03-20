import User from '../schema/user.js'
import curdRepository from './curdRepo.js'

const userRepository = {
  ...curdRepository(User),
  getUserByEmail: async function (email) {
    const user = await this.model.findOne({ email })
    return user
  },
  getByUserame: async function (username) {
    const user = await this.model.findOne({ username })
    return user
  }
}

export default userRepository
