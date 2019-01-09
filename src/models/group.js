
module.exports = (sequelize, DataTypes) => {
    sequelize.define('group', {
        name: DataTypes.STRING,
        municipalitiy: DataTypes.STRING,
    });
}

