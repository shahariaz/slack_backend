import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email Must be unique'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        },
        message: (props) => `${props.value} is not a valid email!`
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username must be unique'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_]+$/.test(v)
        },
        message: (props) => `${props.value} is not a valid username!`
      }
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this
  // Only set default avatar if no avatar is provided or username is modified
  if (
    (!user.avatar || this.isModified('username')) &&
    !this.isModified('avatar')
  ) {
    user.avatar = `https://robohash.org/${user.username}?set=set4&size=400x400`
  }
  next()
})

const User = mongoose.model('User', userSchema)
export default User
