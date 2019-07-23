const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');

module.exports = async (req, res) => {
    try {
        const RestaurantModel = db.getModel('Restaurant');
        let {name, address, description, img} = req.body;
        if (!name || !address || !description || !img) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        if (role === roles.Client) throw new Error("U have no rights to do this");

        const isPresent = await RestaurantModel.findOne({
            where: {
                name
            }
        });
        if (isPresent) throw new Error('Restaurant has already exist');
        const newRestaurant = await RestaurantModel.create({
            name,
            address,
            description,
            img
        });

        res.json({
            success: true,
            msg: 'Restaurant is created'
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
