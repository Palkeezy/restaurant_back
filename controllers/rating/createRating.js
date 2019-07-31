const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const RatingModel = db.getModel('Rating');
        const RestaurantModel = db.getModel('Restaurant');
        const {stars, comment} = req.body;
        const restaurantId = req.params.id;
        if (!stars || !comment) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        if (!role) throw new Error("U have no rights to do this");

        const currentRestaurant = await RestaurantModel.findOne({
            where: {
                id: restaurantId
            }
        });
        if (!currentRestaurant) throw new Error('There is no such Restaurant');

        const newRating = await RatingModel.create({
            restaurant_id: restaurantId,
            users_id: id,
            stars,
            comment
        });

        res.json({
            success: true,
            msg: `Comment for ${currentRestaurant.dataValues.name} is created`
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
