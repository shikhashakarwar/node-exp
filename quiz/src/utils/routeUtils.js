const jwt = require('jsonwebtoken');
const configs = require('../configs/appConfigs');
const responseUtils = require('../utils/responseUtils');

const routeUtils = {
    validateRoutes: function (req, res, next) {
        var token = req.headers['authorization'];
        if(!token) {
            return responseUtils.notAuthorized(res);
        }

        var bearerToken = token.split(' ');
        var jwtToken = bearerToken[1];
        console.log("bearer token");
        console.log(jwtToken);
        return jwt.verify(jwtToken, configs.PRIVATE_KEY, function (error, data) {
            console.log("In jwt verifications");
            if (error) {
                console.log("Jwt verfication fails");
                console.log(error);
                return responseUtils.notAuthorized(res);
            }
            console.log("Jwt verfication success");
            return next();
        });
    }
};


module.exports = routeUtils;