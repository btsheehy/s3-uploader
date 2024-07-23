const { sequelize, Upload, User } = require("../packages/backend/src/models")
const { faker } = require("@faker-js/faker")

const FILE_TYPES = [
	"text/plain",
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/msword",
]
const EXTENSIONS = ["txt", "pdf", "docx", "doc"]

function getWeightedRandom(min, max, skew = 1) {
	return Math.floor(Math.pow(Math.random(), skew) * (max - min + 1) + min)
}

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

		// Assign different characteristics to users
		const userCharacteristics = dbUsers.map((user) => ({
			id: user.id,
			preferredExtension: faker.helpers.arrayElement(EXTENSIONS),
			uploadFrequency: Math.random(), // 0 to 1, higher means more uploads
			averageFileSize: getWeightedRandom(1024, 10 * 1024 * 1024, 2), // Skewed towards smaller files
		}))

		for (let i = 0; i < numUploads; i++) {
			const user = faker.helpers.arrayElement(userCharacteristics)

			// Users are more likely to upload their preferred file type
			const extension =
				Math.random() < 0.7
					? user.preferredExtension
					: faker.helpers.arrayElement(EXTENSIONS)
			const extensionIndex = EXTENSIONS.indexOf(extension)
			const fileType = FILE_TYPES[extensionIndex]

			// Generate upload date based on user's upload frequency
			const uploadDate = faker.date.between({
				from: new Date(2023, 0, 1),
				to: new Date(2024, 6, 22),
			})

			// Generate file size based on user's average file size, with some variation
			const fileSize = Math.min(
				Math.max(
					getWeightedRandom(
						user.averageFileSize * 0.5,
						user.averageFileSize * 1.5,
						1.5,
					),
					1024,
				),
				10 * 1024 * 1024,
			)

			uploads.push({
				fileName: faker.system.fileName() + "." + extension,
				fileSize: fileSize,
				fileType: fileType,
				uploadDate: uploadDate,
				extension: extension,
				UserId: user.id,
			})
		}

		// Sort uploads by date
		uploads.sort((a, b) => a.uploadDate - b.uploadDate)

		await Upload.bulkCreate(uploads)

		console.log(`${numUsers} dummy users created successfully.`)
		console.log(`${numUploads} dummy uploads created successfully.`)
	} catch (error) {
		console.error("Error generating dummy data:", error)
	} finally {
		await sequelize.close()
	}
}

generateDummyData(1000, 10)
