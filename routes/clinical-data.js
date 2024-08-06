const router = require("express").Router();
const { GetClinicalData, IngestClinicalData, ProcessClinicalData } = require("../controllers/clinical-data");

// All method support for Odata Service
router.get("/composite/ingest", GetClinicalData);
router.post("/composite/ingest", IngestClinicalData);
router.post("/composite/process", ProcessClinicalData);

module.exports = router;