const { sequelize, Upload, User } = require("../packages/backend/src/models")
const { faker } = require("@faker-js/faker")

const FILE_TYPES = [
	"text/plain",
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/msword",
]
const EXTENSIONS = ["txt", "pdf", "docx", "doc"]

async function generateDummyData(numUploads = 1000, numUsers = 10) {
	try {
		await sequelize.sync()

		const users = []
		for (let i = 0; i < numUsers; i++) {
			users.push({
				username: faker.person.firstName(),
				password: faker.internet.password(),
			})
		}
		await User.bulkCreate(users)

		const dbUsers = await User.findAll()

		const uploads = []

		for (let i = 0; i < numUploads; i++) {
			const extension = faker.helpers.arrayElement(EXTENSIONS)
			const extensionIndex = EXTENSIONS.indexOf(extension)
			const fileType = FILE_TYPES[extensionIndex]
			const uploadDate = faker.date.between({
				from: "2023-01-01",
				to: "2024-07-22",
			})
			const userId = faker.helpers.arrayElement(dbUsers).id

			uploads.push({
				fileName: faker.system.fileName() + "." + extension,
				fileSize: faker.number.int({ min: 1024, max: 10 * 1024 * 1024 }), // 1KB to 10MB
				fileType: fileType,
				uploadDate: uploadDate,
				extension: extension,
				UserId: userId,
			})
		}

		await Upload.bulkCreate(uploads)

		console.log(`${numUsers} dummy users created successfully.`)
		console.log(`${numUploads} dummy uploads created successfully.`)
	} catch (error) {
		console.error("Error generating dummy data:", error)
	} finally {
		await sequelize.close()
	}
}

generateDummyData()
