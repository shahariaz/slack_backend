import User from '../schema/user.js'
import curdRepository from './curdRepo.js'

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}
export const getUserById = async (id) => {
  const user = await User.findById(id)
  return user
}
export const createUser = async (user) => {
  const newUser = await User.create(user)
  return newUser
}
export const getUser = () => {
  return User.find()
}
export const updateUser = async (id, user) => {
  const updateUser = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true
  })

  return updateUser
}
export const deleteUser = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id)
  return deleteUser
}
export const getAllUsers = async (query) => {
  const { page = 1, limit = 10 } = query
  const skip = (page - 1) * limit
  const users = await User.find().skip(skip).limit(limit)
  const totalUsers = await User.countDocuments()
  const totalPages = Math.ceil(totalUsers / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  const pagination = {
    totalUsers,
    totalPages,
    hasNextPage,
    hasPrevPage
  }
  return {
    users,
    pagination
  }
}
export const getUserWithPagination = async (query) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = -1,
      search = ''
    } = query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const filter = search
      ? {
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {}

    const users = await User.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))

    const totalUsers = await User.countDocuments(filter)
    const totalPages = Math.ceil(totalUsers / parseInt(limit))

    return {
      users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: parseInt(page),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    }
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`)
  }
}
export const getUserByUsername = async (username) => {
  const user = await User.findOne({
    username
  })
  return user
}

const curdMethods = curdRepository(User)

export default curdMethods
