module.exports = (sequelize, DataTypes) => {
    const OrderAndDishes = sequelize.define('OrderAndDishes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        dishes_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        quantity: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'order_dishes',
        timestamps: false
    });

    const Order = sequelize.import('./Order.js');
    const Dishes = sequelize.import('./Dishes.js');

    OrderAndDishes.belongsTo(Order, {foreignKey: 'order_id'});
    OrderAndDishes.belongsTo(Dishes, {foreignKey: 'dishes_id'});

    return OrderAndDishes
};
