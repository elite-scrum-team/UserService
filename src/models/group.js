
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('groups', {
        name: DataTypes.STRING,
        municipalitiy: DataTypes.STRING,
    });
}

