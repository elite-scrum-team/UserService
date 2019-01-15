const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    });
    User.associate = models => {
        User.belongsToMany(models.groups, {
            through: 'users_groups',
            as: 'groups',
            foreignKey: 'userId',
        });
    };
    return User;
};
