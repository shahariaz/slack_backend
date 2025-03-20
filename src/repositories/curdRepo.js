export default function curdRepository(schema) {
  return {
    model: schema,
    create: async function (data) {
      const newDoc = await this.model.create(data)
      return newDoc
    },
    getAll: async function () {
      const allDocs = await this.model.find()
      return allDocs
    },
    getById: async function (id) {
      const doc = await this.model.findById(id)
      return doc
    },
    delete: async function (id) {
      const deletedDoc = await this.model.findByIdAndDelete(id)
      return deletedDoc
    },
    update: async function (id, data) {
      const updatedDoc = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      })
      return updatedDoc
    },
    getWithPagination: async function (query) {
      const { page = 1, limit = 10 } = query
      const skip = (page - 1) * limit
      const docs = await this.model.find().skip(skip).limit(limit)
      const totalDocs = await this.model.countDocuments()
      const totalPages = Math.ceil(totalDocs / limit)
      const hasNextPage = page < totalPages
      const hasPrevPage = page > 1
      const pagination = {
        totalDocs,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
      return {
        docs,
        pagination
      }
    }
  }
}
