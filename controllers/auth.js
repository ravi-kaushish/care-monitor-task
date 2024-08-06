const { ADMIN_CREDENTIALS, SECURITY_CONFIG, IssueJWT, VerifyJWT } = require('../../utils/server/security');

// returns a JWT allowing admins to access console
exports.Authenticate = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.statusCode = 400;
            res.send('Please provide Username and Password');
            return;
        }

        if (Buffer.from(`${req.body.username}:${req.body.password}`).toString('base64') !== Buffer.from(`${ADMIN_CREDENTIALS.username}:${ADMIN_CREDENTIALS.password}`).toString('base64')) {
            res.statusCode = 400;
            res.send('Incorrect Username or Password');
        } else {
            let data = {
                "user": {
                    "username": req.body.username,
                    "role": "admin"
                },
                "sub": req.body.username,
                "resource_access": {
                    "console": ["read", "write", "modify"]
                },
                "scope": "console services api",
                "aud": "console"
            };
            let { error, token } = await IssueJWT(data, SECURITY_CONFIG.jwt.secret, `${SECURITY_CONFIG.jwt.expiry}s`);
            if (error) {
                res.statusCode = 500;
                res.send('Unexpected error occured while authenticating...');
            } else {
                res.send({
                    "access_token": token,
                    "expires_in": SECURITY_CONFIG.jwt.expiry
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.send('Unexpected error occured while authenticating');
    }
};

// returns a JWT allowing admins to access console
exports.Authorized = async (req, res) => {
    let custom_response = false;
    if (!custom_response) {
        if (!req.headers.authorization) {
            res.statusCode = 401;
            res.send('missing authorization header.');
            return;
        }
        let { data, error, message } = await VerifyJWT(req.headers.authorization.replace("Bearer ", ""), SECURITY_CONFIG.jwt.secret);
        if (error) {
            res.statusCode = 401;
            res.send(message);
        } else {
            res.send(data);
        }
    } else {
        // Add code to send any custom response, we are sending the decoded JWT.
    }
};