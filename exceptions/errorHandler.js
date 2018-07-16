const HttpException = require('./HttpException');

module.exports = (err, req, res, next) => {
    if (err instanceof HttpException) {
        return res.status(err.status).json({error: err.message});
    } else {
        return res.status(500).json({error: true});
    }
};
