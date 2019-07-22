module.exports = (sequelize, DataTypes) => {
    const Dishes = sequelize.define('Dishes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE
        },
        img: {
            type: DataTypes.STRING
        },
        menu_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
    }, {
        tableName: 'dishes',
        timestamps: false
    });

    const Menu = sequelize.import('./Menu.js');

    Dishes.belongsTo(Menu, {foreignKey: 'menu_id'});
    return Dishes
};
