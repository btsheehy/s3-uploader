const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	const Upload = sequelize.define("Upload", {
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		filesize: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		filetype: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		uploadDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	})

	return Upload
}
