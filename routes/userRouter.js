const router = require('express').Router();

const createUser = require('../controllers/user/createUser');
const deleteUser = require('../controllers/user/deleteUser');
const getAllUsers = require('../controllers/user/getAllUsers');


router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/users', getAllUsers);


module.exports = router;
