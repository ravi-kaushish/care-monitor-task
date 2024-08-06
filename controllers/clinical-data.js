const { ExecuteQuery } = require('../utils/sequelize')
const { aggregateHeartRateData } = require('../utils/aggregate')

exports.GetClinicalData = async (req, res) => {
  let result = await ExecuteQuery('select * from temple', {})
  if (result.error) {
    res.status(500).send('Error Occured While Executing Database Query')
    return
  }
  let [data, metadata] = result.data
  res.send(data)
}

exports.IngestClinicalData = async (req, res) => {
  let aggregatedDate = await aggregateHeartRateData(req.body.clinical_data.HEART_RATE.data);
  res.send(aggregatedDate)
}

exports.ProcessClinicalData = async (req, res) => {
  let aggregatedDate = await aggregateHeartRateData(req.body.clinical_data.HEART_RATE.data);
  res.send(aggregatedDate)
}
