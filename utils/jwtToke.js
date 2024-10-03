const jwt = require('jsonwebtoken')

const accessTokenAdmin = ( adminId ) => {
    return jwt.sign({ userId : adminId  }, process.env.JWT_ADMIN, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
    // when we create the token we have to send the id or anything inside userId key as its in jwt docs
}

const refreshTokenAdmin = ( adminId ) => {
    return jwt.sign({ userId : adminId  }, process.env.JWT_ADMIN, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}

const accessTokenUser = (userId) => {
    return jwt.sign({ userId : userId}, process.env.JWT_USER, {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}

const refreshTokenUser = ( userId ) => {
    return jwt.sign({ userId : userId}, process.env.JWT_USER, { expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}


module.exports = {
    accessTokenAdmin,
    refreshTokenAdmin,
    accessTokenUser,
    refreshTokenUser
}

