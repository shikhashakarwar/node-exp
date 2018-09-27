
const responseUtils = {
    notAuthorized: function (res) {
        return res.status(401).send({message: 'Not Authorized'});
    }
};

module.exports = responseUtils;