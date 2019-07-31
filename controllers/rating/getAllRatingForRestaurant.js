const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const UsersModel = db.getModel('Users');
        const RatingModel = db.getModel('Rating');
        const RestaurantModel = db.getModel('Restaurant');
        const idRestaurant = req.params.id;
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        if (!role) throw new Error("You need register on site!");

        const currentRestaurant = await RestaurantModel.findOne({
            where: {
                id: idRestaurant
            }
        });
        if (!currentRestaurant) throw new Error('There is no such Restaurant');
        const findedRestaurants = await RatingModel.findAll({
            where: {
                restaurant_id: idRestaurant
            },
            include: [
                {
                    model: UsersModel,
                    attributes: ['username']
                },
                {
                    model: RestaurantModel,
                    attributes: ['name']
                }
            ]
        });
        if (!findedRestaurants) throw new Error('Restaurant dont have ratings');

        res.json({
            success: true,
            msg: findedRestaurants
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
