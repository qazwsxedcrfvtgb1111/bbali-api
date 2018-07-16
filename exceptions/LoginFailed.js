const HttpException = require('./HttpException');

class LoginFailed extends HttpException {
    constructor(message = 'Invalid credentials', status = 401) {
        super(message, status);
    }
}

module.exports = LoginFailed;
