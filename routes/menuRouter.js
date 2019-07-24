const router = require('express').Router();

const createMenu = require('../controllers/menu/createMenu');
const deleteMenu = require('../controllers/menu/deleteMenu');
const getAllMenuInRestaurant = require('../controllers/menu/getAllMenuInRestaurant');


router.post('/', createMenu);
router.delete('/:id', deleteMenu);
router.get('/:id', getAllMenuInRestaurant);


module.exports = router;
