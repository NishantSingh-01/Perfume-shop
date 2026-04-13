import JWT from "jsonwebtoken"

async function verifyJWT(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Token not provided"
        })
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.error("Invalid token Error:", error)
        return res.status(401).json({
            status: false,
            message: "Invalid token"
        })

    }
}

export default verifyJWT