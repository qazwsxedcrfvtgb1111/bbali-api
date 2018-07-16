const express = require('express');
const UserController = require('../controllers/UserController');
const validationRules = require('../validation/user');
const formatResponse = require('../helpers/formatResponse');
const validateData = require('../middleware/validateData');
const router = express.Router();

const controller = new UserController();

router.post('/session', validationRules.loginRules, validateData, (req, res, next) => {
    controller.login(res.locals.validatedData)
        .then(data => formatResponse(res, data.msg, data.data))
        .catch(err => next(err));
});

router.post('/create', validationRules.registrationRules, validateData, (req, res, next) => {
    controller.register(res.locals.validatedData)
        .then(data => formatResponse(res, data.msg, data.data))
        .catch(err => next(err));
});


router.post('/forgotPassword', validationRules.forgotRules, validateData, (req, res, next) => {
    controller.forgotPassword(res.locals.validatedData)
        .then(data => formatResponse(res, data.msg, data.data))
        .catch(err => next(err));
});

router.post('/resetPassword', validationRules.resetRules, validateData, (req, res, next) => {
    controller.resetPassword(res.locals.validatedData)
        .then(data => formatResponse(res, data.msg, data.data))
        .catch(err => next(err));
});


module.exports = router;
