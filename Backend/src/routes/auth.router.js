import express from "express"
import { getUser, loginUser, registerUser } from "../controllers/auth.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-me",verifyJWT, getUser)

export default router