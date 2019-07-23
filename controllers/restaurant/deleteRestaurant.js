const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');


module.exports = async (req, res) => {
    try {
        const RestaurantModel = db.getModel('Restaurant');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        const restaurantId = req.params.id;
        if (!restaurantId) throw new Error('Something wrong with URL');
        if (role !== roles.Admin) throw new Error("U have no rights to do this");

        const restaurantToDelete = await RestaurantModel.findOne({
            where: {
                id: restaurantId
            }
        });
        if (!restaurantToDelete) throw new Error('Restaurant not found');

        await RestaurantModel.destroy({
            where: {
                id: restaurantId
            }
        });

        res.json({
            success: true,
            message: 'Restaurant is deleted from db'
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};
