module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_group', {
        userId: {
            primaryKey: true,
            type: DataTypes.UUID,
        },
        groupId: {
            primaryKey: true,
            type: DataTypes.UUID,
        },
    });
};
