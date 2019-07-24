const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const RestaurantModel = db.getModel('Restaurant');
        const {name, restaurant_id, img} = req.body;
        if (!name || !restaurant_id || !img) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        if (role === roles.Client) throw new Error("U have no rights to do this");

        const currentRestaurant = await RestaurantModel.findOne({
            where: {
                id: restaurant_id
            }
        });
        if (!currentRestaurant) throw new Error('There is no such Restaurant');

        const isPresent = await MenuModel.findOne({
            where: {
                name,
                restaurant_id
            }
        });
        if (isPresent) throw new Error('Menu has already exist');
        const newMenu = await MenuModel.create({
            name,
            restaurant_id,
            img
        });

        res.json({
            success: true,
            msg: `Menu for ${currentRestaurant.dataValues.name} is created`
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
