const Sequelize = require('sequelize')

exports.ExecuteQuery = async (query = '', bind = {}) => {
  try {
    const connection = new Sequelize(process.env.DATABASE_URL, {
      logging: process.env.DATABASE_LOGGING || false
    })
    if (!query) {
      return {
        error: true,
        message: 'No Query Provided'
      }
    }
    return {
      error: false,
      data: await connection.query(query, { bind })
    }
  } catch (error) {
    return {
      error
    }
  }
}
