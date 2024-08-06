const router = require("express").Router();
const { GetClinicalData, ProcessClinicalData } = require("../controllers/clinical-data");

// All method support for Odata Service
router.get("/composite/ingest", GetClinicalData);
router.post("/composite/ingest", ProcessClinicalData);
router.get("/composite/ingest/:ingest_id", GetClinicalData);
// router.get("/composite/process", GetServiceHealth);
// router.get("/heartrate/ingest", GetServiceHealth);
// router.get("/heartrate/process", GetServiceHealth);

module.exports = router;