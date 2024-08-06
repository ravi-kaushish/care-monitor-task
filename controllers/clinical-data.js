const { ExecuteQuery } = require('../utils/sequelize')

exports.GetClinicalData = async (req, res) => {
  let result = await ExecuteQuery('select * from temple', {})
  if (result.error) {
    res.status(500).send('Error Occured While Executing Database Query')
    return
  }
  let [data, metadata] = result.data
  res.send(data)
}

exports.ProcessClinicalData = (req, res) => {
  console.log(req.body)
  res.send('This is where you can retrieve Clinical Data')
}
