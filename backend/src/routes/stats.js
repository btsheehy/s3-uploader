const express = require("express")
const { Op } = require("sequelize")
const auth = require("../middleware/auth")
const { Upload, sequelize } = require("../models")

const router = express.Router()

router.get("/", auth, async (req, res) => {
	try {
		const totalUploads = await Upload.count({ where: { UserId: req.user.id } })

		const totalSize = await Upload.sum("filesize", {
			where: { UserId: req.user.id },
		})

		const fileTypeDistribution = await Upload.findAll({
			attributes: [
				"filetype",
				[sequelize.fn("COUNT", sequelize.col("filetype")), "count"],
			],
			where: { UserId: req.user.id },
			group: ["filetype"],
		})

		const uploadsByDate = await Upload.findAll({
			attributes: [
				[sequelize.fn("date", sequelize.col("uploadDate")), "date"],
				[sequelize.fn("COUNT", sequelize.col("id")), "count"],
			],
			where: { UserId: req.user.id },
			group: [sequelize.fn("date", sequelize.col("uploadDate"))],
			order: [[sequelize.fn("date", sequelize.col("uploadDate")), "ASC"]],
		})

		res.json({
			totalUploads,
			totalSize,
			fileTypeDistribution,
			uploadsByDate,
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Error fetching stats" })
	}
})

module.exports = router
