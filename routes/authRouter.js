const router = require('express').Router();

const authUser = require('../controllers/auth/authUser');

router.post('/', authUser);

module.exports = router;
