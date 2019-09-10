const db = require('../../dataBase').getInstance();
const tokenizer = require('../../helpers/tokenizer').auth;
module.exports = async (req, res) => {
    try {
        const UsersModel = db.getModel('Users');
        const {email = '', password = ''} = req.body;
        if (!email || !password) throw new Error('Some fields is empty');
        const isPresent = await UsersModel.findOne({
            where: {email}
        });
        if (!isPresent) throw new Error('You are not register');
        const {id, name, role} = isPresent;
        const token = tokenizer({id, name, role});

        res.json({
            success: true,
            msg: token
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
