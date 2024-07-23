const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const { sequelize } = require("./models")
const authRoutes = require("./routes/auth")
const uploadRoutes = require("./routes/upload")
const statsRoutes = require("./routes/stats")

dotenv.config()

const app = express()

const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true, // This is important for sending cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/stats", statsRoutes)

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
