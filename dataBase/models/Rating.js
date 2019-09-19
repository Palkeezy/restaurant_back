module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            foreignKey:true
        },
        users_id: {
            type: DataTypes.INTEGER,
            foreignKey:true
        },
        stars: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'rating',
        timestamps: false
    });

    const User = sequelize.import('./Users.js');
    const Restaurant = sequelize.import('./Restaurant.js');

    Rating.belongsTo(User, {foreignKey: 'users_id'});
    Rating.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});
    return Rating
};
