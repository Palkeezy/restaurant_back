const jwt = require('jsonwebtoken');
const {secret} = require('../constants/secret');


module.exports.auth = (data) => {
    const accessToken = jwt.sign(data, secret, {expiresIn: '30d'});

    return {accessToken};
};
