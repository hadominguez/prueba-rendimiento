const logger = require('../../utils/logger');

const registerRequest = (req, res, next) => {
        logger.info( 'REQUEST: IP: '+ req.ip + ' - URL: '+ req.originalUrl);
        return next();
}
module.exports = {
    registerRequest
}