const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const RestaurantModel = db.getModel('Restaurant');
        const idRestaurant = req.params.id;
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        if (!role) throw new Error("You need register on site!");

        const currentRestaurant = await RestaurantModel.findOne({
            where: {
                id: idRestaurant
            }
        });
        if (!currentRestaurant) throw new Error('There is no such Restaurant');
        const findedMenus = await MenuModel.findAll({
            where: {
                restaurant_id: idRestaurant
            }
        });
        if (!findedMenus) throw new Error('Restaurant dont have menu');

        res.json({
            success: true,
            msg: findedMenus
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
