module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        img: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'menu',
        timestamps: false
    });

    const Restaurant = sequelize.import('./Restaurant.js');

    Menu.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});
    return Menu
};
