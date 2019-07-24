const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        const menuId = req.params.id;
        if (!menuId) throw new Error('Something wrong with URL');
        if (role === roles.Client) throw new Error("U have no rights to do this");

        const menuToDelete = await MenuModel.findOne({
            where: {
                id: menuId
            }
        });
        if (!menuToDelete) throw new Error('Menu not found');

        await MenuModel.destroy({
            where: {
                id: menuId
            }
        });

        res.json({
            success: true,
            message: `Menu ${menuToDelete.dataValues.name} is deleted from db`
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};
