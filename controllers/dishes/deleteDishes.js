const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const DishesModel = db.getModel('Dishes');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        const dishesId = req.params.id;
        if (!dishesId) throw new Error('Something wrong with URL');
        if (role === roles.Client) throw new Error("U have no rights to do this");

        const dishesToDelete = await DishesModel.findOne({
            where: {
                id: dishesId
            }
        });
        if (!dishesToDelete) throw new Error('Dishes not found');

        await DishesModel.destroy({
            where: {
                id: dishesId
            }
        });

        res.json({
            success: true,
            msg: `Dishes ${dishesToDelete.dataValues.name} is deleted from db`
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            msg: e.message
        })
    }
};
