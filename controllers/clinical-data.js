const { AggregateHeartRateData } = require('../utils/aggregate')
const { GetMeasurements } = require('../utils/db-migrations')
const { SaveMetrics } = require('../utils/ingest')

exports.IngestClinicalData = async (req, res) => {
  res.status(202).send("Your request to ingest clinical data has been accepted.");
  this.SaveDataToDB(req.body);
}

exports.ProcessClinicalData = async (req, res) => {
  // Processing Req and sending aggregated response data
  const aggregatedHeartRateData = await AggregateHeartRateData(req.body.clinical_data.HEART_RATE.data);
  res.send(aggregatedHeartRateData);
  // Saving Data to the Database
  this.SaveDataToDB(req.body);
}

// Sample Implementation for heart rate data ingestion
exports.IngestHeartRateData = async (req, res) => {
  res.status(202).send("Your request to ingest heart rate data has been accepted.");
  // Continue to ingest heart rate data
}

// Sample Implementation for heart rate data processing
exports.ProcessHeartRateData = async (req, res) => {
// Process Heart Rate Data and send response
 res.send({
  data: ["Processed heart rate data"]
 });
}

exports.SaveDataToDB = async __ => {
  const result = await GetMeasurements();
  const org_id = __.orgId
  const patient_id = __.patient_id
  clinical_data = __.clinical_data
  if (!result.error) {
    let [measurements] = result.data
    Object.keys(clinical_data).forEach(key => {
      //Only Process to save the data when there is data in the clinical data object
      if (clinical_data[key] && clinical_data[key].data && clinical_data[key].data.length) {
        
        // Get the Measurement for current metric
        measurement = measurements.find(a => a.key === key)
        
        //Saving the Metrics to the database
        SaveMetrics(patient_id, measurement, clinical_data[key].data);
        
        // Extra
        // If you want different transformations with each type of metric data before saving to DB, 
        // do the trasformation before calling the savemetrics, or create different implementations of savemetrics like below
            // if (key === 'HEART_RATE') {
            //   SaveHeartRateMetrics(patient_id, measurement, clinical_data[key].data)
            // } else if (key === 'WEIGHT') {
            //   SaveWeightMetrics(patient_id, measurement, clinical_data[key].data)
            // }...
      }
    })
  } else {
    //Log The request, push it into a queue or a cache to process it later
  }
}
