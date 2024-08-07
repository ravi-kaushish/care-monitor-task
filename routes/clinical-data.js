const router = require("express").Router();
const {  IngestClinicalData, ProcessClinicalData } = require("../controllers/clinical-data");

// Endpoint just to Save Data
router.post("/composite/ingest", IngestClinicalData);

// Endpoint to Process and Save Data
router.post("/composite/process", ProcessClinicalData);

//  Create Multiple Implementations of API for each type of health data
// router.post("/heart-rate/ingest", IngestHeartRateData);
// router.post("/heart-rate/process", ProcessHeartRateData);

module.exports = router;