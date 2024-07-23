const { DataTypes } = require("sequelize")
const crypto = require("crypto")

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const salt = crypto.randomBytes(16).toString("hex")
                const hash = crypto
                    .pbkdf2Sync(value, salt, 1000, 64, "sha512")
                    .toString("hex")
                this.setDataValue("password", `${hash}.${salt}`)
            },
        },
    })

    User.prototype.validPassword = function (password) {
        const [hash, salt] = this.password.split(".")
        const newHash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, "sha512")
            .toString("hex")
        return hash === newHash
    }

    return User
}
