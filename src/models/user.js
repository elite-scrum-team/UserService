
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        isAdmin: DataTypes.BOOL,
    });
}
