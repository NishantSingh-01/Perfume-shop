import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({
            username,
            email,
            password,
        })

        const token = generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error At Register", error: error.message })
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await user.isPassword(password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error At Login", error: error.message })
    }
}
export async function Logout(req, res) {
    try {
        const token = req.cookies.token
        res.clearCookie("token")

        res.status(200).json({
            status: true,
            message: 'Logout Successfully'
        })

    } catch (error) {
        console.error("Logout Error:", error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}
export const getUser=async(req, res)=> {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not Found"
            })

        }
        return res.status(200).json({
            status: true,
            message: "User Found Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Get User Error:", error)
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}