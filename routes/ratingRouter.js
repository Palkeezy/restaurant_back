const router = require('express').Router();

const createRating = require('../controllers/rating/createRating');
const deleteRating = require('../controllers/rating/deleteRating');
const getAllRatingForRestaurant = require('../controllers/rating/getAllRatingForRestaurant');


router.post('/:id', createRating);
router.delete('/:ratingId/:restaurantId', deleteRating);
router.get('/:id', getAllRatingForRestaurant);


module.exports = router;
