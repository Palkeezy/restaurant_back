module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        users_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        status: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'order',
        timestamps: false
    });

    const Restaurant = sequelize.import('./Restaurant.js');
    const Users = sequelize.import('./Users.js');

    Order.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});
    Order.belongsTo(Users, {foreignKey: 'users_id'});

    return Order
};
