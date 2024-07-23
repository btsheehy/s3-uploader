const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Upload = sequelize.define("Upload", {
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploadDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Upload
}
