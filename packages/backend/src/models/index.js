const { Sequelize } = require("sequelize")
const path = require("path")

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "..", "..", "database.sqlite"),
})

const User = require("./user")(sequelize)
const Upload = require("./upload")(sequelize)

User.hasMany(Upload, { foreignKey: "UserId", as: "uploads" })
Upload.belongsTo(User, { foreignKey: "UserId", as: "user" })

module.exports = {
	sequelize,
	User,
	Upload,
}
