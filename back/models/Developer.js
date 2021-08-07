module.exports = (sequelize, DataTypes) => {
    const Developer = sequelize.define('developer', {
        id: { type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        nome: DataTypes.STRING,
        sexo: DataTypes.STRING,
        idade: DataTypes.INTEGER,
        datanascimento: DataTypes.DATEONLY,
        hobby: DataTypes.STRING,
    });

    return Developer;
}