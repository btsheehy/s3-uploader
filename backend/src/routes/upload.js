const express = require("express")
const AWS = require("aws-sdk")
const multer = require("multer")
const auth = require("../middleware/auth")
const { Upload } = require("../models/")

const router = express.Router()

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()

const upload = multer({
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
	fileFilter: (req, file, cb) => {
		const allowedExtensions = [".txt", ".pdf", ".doc", ".docx"]
		const fileExtension = "." + file.originalname.split(".").pop().toLowerCase()
		if (allowedExtensions.includes(fileExtension)) {
			cb(null, true)
		} else {
			cb(new Error("Invalid file type"))
		}
	},
})

router.post("/", auth, upload.single("file"), async (req, res) => {
	try {
		const file = req.file
		const params = {
			Bucket: process.env.S3_BUCKET_NAME,
			Key: `${Date.now()}-${file.originalname}`,
			Body: file.buffer,
		}

		const uploadResult = await s3.upload(params).promise()

		const newUpload = Upload.create({
			fileName: file.originalname,
			fileSize: file.size,
			fileType: file.mimetype,
			extension: file.originalname.split(".")?.pop()?.toLowerCase() || null,
			UserId: req.user.id,
		})

		res.json({ message: "File uploaded successfully" })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Error uploading file" })
	}
})

module.exports = router
