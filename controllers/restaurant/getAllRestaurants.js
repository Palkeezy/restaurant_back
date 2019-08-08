const db = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const RestaurantModel = db.getModel('Restaurant');

        const allRestaurants = await RestaurantModel.findAll({});
        if (!allRestaurants) throw new Error('Restaurants not found');

        res.json({
            success: true,
            msg: allRestaurants
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            msg: e.message
        })
    }
};
