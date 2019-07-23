const router = require('express').Router();

const createRestaurant = require('../controllers/restaurant/createRestaurant');
const deleteRestaurant = require('../controllers/restaurant/deleteRestaurant');
const getAllRestaurants = require('../controllers/restaurant/getAllRestaurants');


router.post('/', createRestaurant);
router.delete('/:id', deleteRestaurant);
router.get('/', getAllRestaurants);


module.exports = router;
