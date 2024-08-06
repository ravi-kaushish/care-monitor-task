const Sequelize = require('sequelize')

let connection = null

exports.ExecuteQuery = async (query = '', bind = {}) => {
  try {
    if (!query) {
      return {
        error: true,
        message: 'No Query Provided'
      }
    }

    if (!connection) {
      connection = await new Sequelize(process.env.DATABASE_URL, {
        logging: process.env.DATABASE_LOGGING === "true" ? true : false
      })

      // Refresh connections every 1 hour
      setInterval(() => {
        connection = null
        console.log(`Refreshing database connection...`)
      }, (process.env.DATABASE_CONNECTION_REFRESH_TIME || 1) * 60 * 60 * 1000)
    }

    return {
      error: false,
      data: await connection.query(query, { bind })
    }
  } catch (error) {
    return {
      error: error
    }
  }
}
