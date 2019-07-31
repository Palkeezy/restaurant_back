const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const DishesModel = db.getModel('Dishes');
        const RestaurantModel = db.getModel('Restaurant');
        const {name, description, price, img, menu_id} = req.body;
        if (!name || !description || !price || !img || !menu_id) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        if (role === roles.Client) throw new Error("U have no rights to do this");


        const newDishes = await DishesModel.create({
            name,
            description,
            price,
            img,
            menu_id
        });

        res.json({
            success: true,
            msg: `Dishes is created`
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
