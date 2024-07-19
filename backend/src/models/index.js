const { Sequelize } = require("sequelize")
const path = require("path")

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "..", "..", "database.sqlite"),
})

const User = require("./User")(sequelize)
const Upload = require("./Upload")(sequelize)

User.hasMany(Upload, { foreignKey: "UserId", as: "uploads" })
Upload.belongsTo(User, { foreignKey: "UserId", as: "user" })

module.exports = {
	sequelize,
	User,
	Upload,
}
