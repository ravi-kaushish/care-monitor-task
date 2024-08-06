const { GetServerUsage, GetServerEndpoints } = require('../utils/server')

exports.GetServiceHealth = (req, res) => {
  res.send({
    message: 'Server is up and running.',
    server: GetServerUsage()
  })
}

exports.GetServiceMap = (req, res) => {
  res.send({
    message: 'Following are the endpoints exposed by the server',
    server: GetServerEndpoints()
  })
}
