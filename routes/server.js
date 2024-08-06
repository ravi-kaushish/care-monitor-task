const router = require("express").Router();
const { GetServiceHealth, GetServiceMap } = require("../controllers/server");

// All method support for Odata Service
router.get("/health", GetServiceHealth);
router.get("/map", GetServiceMap);

module.exports = router;