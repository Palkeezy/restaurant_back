const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const RatingModel = db.getModel('Rating');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        const {ratingId, restaurantId} = req.params;
        if (!ratingId || !restaurantId) throw new Error('Something wrong with URL');
        if (!role) throw new Error("U have no rights to do this");

        const ratingToDelete = await RatingModel.findOne({
            where: {
                id: ratingId,
                users_id: id,
                restaurant_id: restaurantId
            }
        });
        if (!ratingToDelete) throw new Error('Menu not found');

        await RatingModel.destroy({
            where: {
                id: ratingId,
                users_id: id,
                restaurant_id: restaurantId
            }
        });

        res.json({
            success: true,
            message: `Rating is deleted from db`
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};
