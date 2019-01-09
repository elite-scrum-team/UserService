
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users_groups', {
        userId: DataTypes.INTEGER,
        groupId: DataTypes.INTEGER,
    });
}
