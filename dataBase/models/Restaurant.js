module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'restaurant',
        timestamps: false
    });

    return Restaurant
};
