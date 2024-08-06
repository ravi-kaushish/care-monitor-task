const { SECURITY_CONFIG, VerifyJWT } = require("../../utils/server/security");

//middleware to Verify User Identity
exports.Authorize = async (req, res, next) => {
    if (req.headers["authorization"]) {
        const result = await VerifyJWT(req.headers["authorization"].replace("Bearer ", ""), SECURITY_CONFIG.jwt.secret);
        if (!result.error) return next();
        res.statusCode = 401;
        res.send("Invalid Access Token");
    } else {
        res.statusCode = 401
        res.send("Unauthorized");
    }
};