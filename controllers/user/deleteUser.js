const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');


module.exports = async (req, res) => {
    try {
        const UsersModel = db.getModel('Users');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        const userId = req.params.id;
        if (!userId) throw new Error('Something wrong with URL');
        if (role !== roles.Admin) throw new Error("U have no rights to do this");

        const userToDelete = await UsersModel.findOne({
            where: {
                id: userId
            }
        });
        if (!userToDelete) throw new Error('User not found');

        await UsersModel.destroy({
            where: {
                id: userId
            }
        });

        res.json({
            success: true,
            message: 'User is deleted from db'
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
};
