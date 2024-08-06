const router = require("express").Router();
const { Authorize } = require("../../middlewares/console/auth");
const { Authenticate, Authorized } = require("../../controllers/console/auth");

// All method support for Odata Service
router.post("/authenticate", Authenticate);
router.all("/authorize", Authorize, Authorized);

module.exports = router;