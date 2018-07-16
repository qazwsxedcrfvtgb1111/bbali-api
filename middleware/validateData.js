const {matchedData} = require('express-validator/filter');
const {validationResult} = require('express-validator/check');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error: errors.array()});
    }

    res.locals.validatedData = matchedData(req);
    next();
};
