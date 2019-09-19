module.exports = (sequelize, DataTypes) => {
    //роблю опис моделі, оприділяю модель дішес, задаю об'єкт конфігів
    const Dishes = sequelize.define('Dishes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
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
        // вимагати поля create_at
        timestamps: false
    });

    const Menu = sequelize.import('./Menu.js');

    // дішеси звязані з меню по вторинному ключу
    Dishes.belongsTo(Menu, {foreignKey: 'menu_id'});
    return Dishes
};
