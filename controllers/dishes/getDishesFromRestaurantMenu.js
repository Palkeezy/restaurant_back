const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const DishesModel = db.getModel('Dishes');
        const RestaurantModel = db.getModel('Restaurant');
        const {restaurantId, menuId} = req.params;
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        if (!role) throw new Error("You need register on site!");

        const currentRestaurant = await RestaurantModel.findOne({
            where: {
                id: restaurantId
            }
        });
        if (!currentRestaurant) throw new Error('There is no such Restaurant');

        const currentMenu = await MenuModel.findOne({
            where: {
                id: menuId
            }
        });
        if (!currentMenu) throw new Error('There is no such Menu');

        const findedDishes = await DishesModel.findAll({
            where: {
                menu_id: menuId
            },
            include: [
                {
                    model: MenuModel,
                    attributes: ['name'],
                    include: [
                        {
                            model:RestaurantModel,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });
        if (!findedDishes) throw new Error('Menu dont have dishes');

        res.json({
            success: true,
            msg: findedDishes
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
