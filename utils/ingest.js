const { ExecuteQuery } = require('./sequelize')

exports.SaveMetrics = async (patient_id, measurement, metrics) => {
  for (let metric of metrics) {
    console.log(metric)
    await ExecuteQuery(
      `INSERT INTO metrics(patient_id, measurement_id, value, timestamp) VALUES ($patient_id, $measurement_id, $value, $timestamp)`,
      {
        patient_id,
        measurement_id: measurement.id,
        value: metric.measurement,
        timestamp: metric.on_date
      }
    )
  }
  console.log(`${measurement.name} Metrics saved for patient ${patient_id}`)
}
