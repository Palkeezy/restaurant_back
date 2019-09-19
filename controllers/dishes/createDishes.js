const {resolve: resolvePath} = require('path');
const db = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator').auth;
const roles = require('../../constants/roles');
const {secret} = require('../../constants/secret');
const fileChecker = require('../../helpers/fileChecker');
const {MENU} = require('../../constants/dirEnum');

module.exports = async (req, res) => {
    try {
        const MenuModel = db.getModel('Menu');
        const DishesModel = db.getModel('Dishes');
        const {name, description, price, menu_id} = req.body;
        if (!name || !description || !price || !menu_id) throw new Error('Some field is empty');
        const token = req.get('Authorization');
        const {role} = tokenVerificator(token, secret);
        if (role === roles.Client) throw new Error("U have no rights to do this");

        const isMenu = await MenuModel.findOne({
            where: {
                id: menu_id
            }
        });
        if (!isMenu) throw new Error('Menu is not found');
        const isDishes = await DishesModel.findOne({
            where: {
                name: name
            }
        });
        if (isDishes) throw new Error('Dishes already exist');
        const photo = req.files;
        if (!photo) throw new Error('Please add dishes photo');
        const {photo: img} = await fileChecker(req.files, isMenu.name, MENU);
        img.mv(resolvePath(`${appRoot}/public/${img.path}`));

        const newDishes = await DishesModel.create({
            name,
            description,
            price,
            img: img.path,
            menu_id
        });

        res.json({
            success: true,
            msg: newDishes
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
