const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(409).json({
            success: false,
            message: "No token found, Unauthorized user"
        });
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(err) {
        return res.status(409).json({
            success: false,
            message: "User invalid",
            error: err.message
        });
    }
    
    req.user = decoded;
    next();
}

module.exports = identifyUser;