const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function decodeJWToken(token) {
    let decodedToken;
    try {
        decodedToken = jwt.decode(token);
    } catch (e) {
        console.log(e);
    }
    return decodedToken;
}

function isAuth(req, res, next) {
    let token;
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');
        token = authHeader[1];
    }

    if (token) {
        const decodedJWToken = decodeJWToken(token);
        if (decodedJWToken.id === parseInt(req.params.id)) {
            console.log(decodedJWToken.id, req.params.id);
            next();
        } else {
            res.status(401).json({
                status: 401,
                message: 'You are not authorized to access this resource.'
            });
        }
    } else {
        res.status(400).json({
            status: 400,
            message: 'You are not authenticated, please log in.'
        });
    }
}


function isPasswordCorrect(passwordAttempt, savedHash, savedSalt) {
    const iterations = 10000;
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, iterations, 64, 'sha512').toString('hex');
}

module.exports = {
    decodeJWToken,
    isAuth,
    isPasswordCorrect
};
