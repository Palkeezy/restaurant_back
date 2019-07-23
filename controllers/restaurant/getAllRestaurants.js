const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;

module.exports = async (req, res) => {
    try {
        const RestaurantModel = db.getModel('Restaurant');

        const allRestaurants = await RestaurantModel.findAll({});
        if (!allRestaurants) throw new Error('Restaurants not found');

        res.json({
            success: true,
            message: allRestaurants
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};