const express = require("express")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ where: { username } })
        if (user)
            return res.status(400).json({ message: "User already exists" })

        user = await User.create({ username, password })

        const payload = { user: { id: user.id } }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                    sameSite:
                        process.env.NODE_ENV === "production" ? "none" : "lax", // Must be 'none' to enable cross-site delivery
                    maxAge: 3600000, // 1 hour
                })

                res.json({
                    message: "Registered successfully",
                    user: { id: user.id, username: user.username },
                })
            },
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ where: { username } })
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = user.validPassword(password)
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" })

        const payload = { user: { id: user.id } }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                    sameSite:
                        process.env.NODE_ENV === "production" ? "none" : "lax", // Must be 'none' to enable cross-site delivery
                    maxAge: 3600000, // 1 hour
                })

                res.json({
                    message: "Logged in successfully",
                    user: { id: user.id, username: user.username },
                })
            },
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Logged out successfully" })
})

router.get("/check", auth, (req, res) => {
    res.json({ isAuthenticated: true })
})

module.exports = router
