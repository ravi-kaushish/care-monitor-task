//middleware to Verify User Identity
exports.Authorize = async (req, res, next) => {
    if (req.headers["authorization"]) {
        // Your Authorization Logic here

        // if (authorized) return next();

        // res.statusCode = 401;
        // res.send("Invalid Access Token");

        return next()
    } else {
        res.statusCode = 401
        res.send("Unauthorized");
    }
};