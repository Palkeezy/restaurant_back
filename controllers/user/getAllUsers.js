const db = require('../../dataBase').getInstance();
const Sequelize = require("sequelize");
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const UsersModel = db.getModel('Users');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        if (role !== roles.Admin) throw new Error("U have no rights to do this");
        const allUsers = await UsersModel.findAll({});
        if (!allUsers) throw new Error('Users not found');

        res.json({
            success: true,
            msg: allUsers
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            msg: e.message
        })
    }
};
