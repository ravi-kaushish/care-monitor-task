const Sequelize = require('sequelize')

var connection = null

exports.ExecuteQuery = async (query = '', bind = {}) => {
  try {
    if (!connection) {
      connection = new Sequelize(process.env.DATABASE_URL, {
        logging: process.env.DATABASE_LOGGING || false
      })
      // Refresh connections every 1 hour
      setInterval(() => {
        connection = null
        console.log(`Refreshing database connection...`)
      }, (process.env.DATABASE_CONNECTION_REFRESH_TIME || 1) * 60 * 60 * 1000)
    }
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
