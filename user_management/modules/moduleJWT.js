const jwt = require('jsonwebtoken');

module.exports.signJWT = (data, exp = '1h') => {
    return jwt.sign(data,
        process.env.JWT_SECRET,
        { expiresIn: exp });
}

module.exports.decodeJWT = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return false;
        }
        return decoded;
    })
}