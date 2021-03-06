const db = require('../../dataBase').getInstance();
const roles = require('../../constants/roles');

module.exports = async (req, res) => {
    try {
        const UsersModel = db.getModel('Users');
        let {username, surname, email, password, role} = req.body;
        console.log(role);
        if (!username || !surname || !email || !password) throw new Error('Some field is empty');

        const isPresent = await UsersModel.findOne({
            where: {
                email
            }
        });
        if (isPresent) throw new Error('Email has already exist');

            const addRestaurant = await UsersModel.create({
                username,
                surname,
                email,
                password,
                role: role
            });

        res.json({
            success: true,
            msg: 'User is created'
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
