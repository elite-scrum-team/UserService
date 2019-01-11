
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    });
    User.associate = (models) => {
        console.log(models);
        User.belongsToMany(models.groups, {
            through: 'users_groups',
            as: 'groups',
            foreignKey: 'userId'
        });
    };
    return User;
}
