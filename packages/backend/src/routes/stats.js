const express = require("express")
const { Op } = require("sequelize")
const auth = require("../middleware/auth")
const { Upload, sequelize, User } = require("../models")

const router = express.Router()

router.get("/", auth, async (req, res) => {
    try {
        const filterObj = {}
        if (req.query.userId) filterObj.UserId = req.params.userId
        if (req.query.startDate || req.query.endDate) {
            filterObj.uploadDate = {}
            if (req.query.startDate)
                filterObj.uploadDate[Op.gte] = req.query.startDate
            if (req.query.endDate)
                filterObj.uploadDate[Op.lte] = req.query.endDate
        }

        const totalUploads = await Upload.count({ where: filterObj })

        const totalSize = await Upload.sum("filesize", { where: filterObj })

        const fileTypeDistribution = await Upload.findAll({
            attributes: [
                "extension",
                [sequelize.fn("COUNT", sequelize.col("extension")), "count"],
            ],
            where: filterObj,
            group: ["extension"],
        })

        const uploadsByDate = await Upload.findAll({
            attributes: [
                [sequelize.fn("date", sequelize.col("uploadDate")), "date"],
                [sequelize.fn("COUNT", sequelize.col("id")), "count"],
            ],
            where: filterObj,
            group: [sequelize.fn("date", sequelize.col("uploadDate"))],
            order: [[sequelize.fn("date", sequelize.col("uploadDate")), "ASC"]],
        })

        const uploadsByUser = await Upload.findAll({
            attributes: [
                "UserId",
                [sequelize.fn("COUNT", sequelize.col("Upload.id")), "count"],
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
            ],
            where: filterObj,
            group: ["UserId", "user.username"],
        })

        const uploadsByUserFormatted = uploadsByUser.map((v) => ({
            count: v.dataValues.count,
            username: v.user.username,
            userId: v.UserId,
        }))

        const uploadSpaceByUser = await Upload.findAll({
            attributes: [
                "UserId",
                [sequelize.fn("SUM", sequelize.col("filesize")), "totalSize"],
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
            ],
            where: filterObj,
            group: ["UserId", "user.username"],
        })

        const uploadSpaceByUserFormatted = uploadSpaceByUser.map((v) => ({
            totalSize: v.dataValues.totalSize,
            username: v.user.username,
            userId: v.UserId,
        }))

        res.json({
            totalUploads,
            totalSize,
            fileTypeDistribution,
            uploadsByDate,
            uploadsByUser: uploadsByUserFormatted,
            uploadSpaceByUser: uploadSpaceByUserFormatted,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error fetching stats" })
    }
})

module.exports = router
