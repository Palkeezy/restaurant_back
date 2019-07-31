const router = require('express').Router();

const createDishes = require('../controllers/dishes/createDishes');
const deleteDishes = require('../controllers/dishes/deleteDishes');
const getDishesFromRestaurantMenu = require('../controllers/dishes/getDishesFromRestaurantMenu');


router.post('/', createDishes);
router.delete('/:id', deleteDishes);
router.get('/:restaurantId/:menuId', getDishesFromRestaurantMenu);


module.exports = router;
