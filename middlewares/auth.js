const jwt = require('jsonwebtoken')



const auth = ( role ) => {
    return (req, res, next) => {
        const token = req.cookies.accesstoken

        if(!token) return res.status(403).json({msg : 'no token provided'})

        
        try {
            let secretKey
            if( role === 'admin'){
                secretKey = process.env.JWT_ADMIN
            } else if( role === 'user'){
                secretKey = process.env.JWT_USER
            } else {
                return res.status(403).json({
                    msg : 'invlid role '
                })
            }

            const decodedToken = jwt.verify(token, secretKey)
            
            req.userId = decodedToken.userId
            // im always confused here !! 
            next()
        } catch (error) {
            res.status(500).json({
                msg : `Unable to verify the token error : ${error.message}`
            })
        }
    }
}


const adminAuth = auth('admin')
const userAuth = auth('user')

module.exports = {
    adminAuth,
    userAuth
}



// const adminAuth = (req, res, next) => {
//     const token = req.cookies.accesstoken
    
//     if(!token) return res.status(403).json({msg : 'No access token available'})

//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_ADMIN)
//         req.admin = decodedToken.userId
//         next()
//     } catch (error) {
//         res.status(500).json({
//             msg : `unable to verify the token error : ${error.message}`
//         })
//     }     
// }