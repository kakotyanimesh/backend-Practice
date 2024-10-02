const jwt = require('jsonwebtoken')

const accessTokenAdmin = (userId) => {
    return jwt.sign({ userId}, process.env.JWT_ADMIN, {expiresIn : '24h'})
}

const refreshTokenAdmin = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ADMIN, {expiresIn : '7d'})
}


module.exports = {
    accessTokenAdmin,
    refreshTokenAdmin
}