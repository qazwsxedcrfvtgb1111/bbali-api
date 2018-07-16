const HttpException = require('./HttpException');

class InvalidToken extends HttpException {
    constructor(message = 'Token is invalid', status = 401) {
        super(message, status);
    }
}

module.exports = InvalidToken;
