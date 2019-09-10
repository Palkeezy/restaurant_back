const {resolve: resolvePath} = require('path');
const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');
const fileChecker = require('../../helpers/fileChecker');
const {RESTAURANTS} = require('../../constants/dirEnum');


module.exports = async (req, res) => {
    try {
        const RestaurantModel = db.getModel('Restaurant');
        let {name, address, description} = req.body;
        //const {photo} = req.files;
        if (!name || !address || !description) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {id, role} = tokenVerificator(token, secret);
        if (role === roles.Client) throw new Error("U have no rights to do this");
        //if (!photo) throw new Error('U must add restaurant photo');
        const isPresent = await RestaurantModel.findOne({
            where: {
                name
            }
        });

        if (isPresent) throw new Error('Restaurant has already exist');
        if (req.files) {
            const {photo} = req.files;
            if (photo) {
                const {photo: goodPhoto} = await fileChecker(req.files, id, RESTAURANTS);
                goodPhoto.mv(resolvePath(`${appRoot}/public/${goodPhoto.path}`));

                await RestaurantModel.create({
                    name,
                    address,
                    description,
                    img: goodPhoto.path
                });
            }
        }

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
