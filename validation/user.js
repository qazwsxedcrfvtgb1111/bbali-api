const {check, oneOf} = require('express-validator/check');
const User = require('../models/User');

const registrationRules = [
    oneOf(
        [
            check('email')
                .isEmail()
                .trim()
                .normalizeEmail()
                .custom(email => {
                    if (email) {
                        User.findOne({email}).then(res => console.log(res) || res && Promise.reject('Email is in use') || Promise.resolve());
                    }
                    return true;
                }),
            check('phone')
                .exists()
                .matches(/^\+[\d]{2} [\d]{10}$/)
                .custom(phone => User.findOne({phone}).then(res => res && Promise.reject('Phone is in use') || Promise.resolve()))
        ]
    ),
    check('fullName')
        .exists()
        .isLength({min: 2, max: 255}),
    check('password')
        .exists()
        .isLength({min: 5}),
    check('userLat')
        .optional()
        .isNumeric(),
    check('userLon')
        .optional()
        .isNumeric(),
    check('selectedLanguage')
        .optional()
        .isLength({min: 2, max: 255})
];

const loginRules = [
    oneOf(
        [
            check('email')
                .isEmail()
                .trim()
                .normalizeEmail(),
            check('phone')
                .exists()
                .matches(/^\+[\d]{2} [\d]{10}$/)

        ]
    ),
    check('password')
        .exists()
        .isLength({min: 5}),
    check('userLat')
        .optional()
        .isNumeric(),
    check('userLon')
        .optional()
        .isNumeric(),
];

const forgotRules = [
    check('email')
        .isEmail()
        .trim()
        .normalizeEmail()
];

const resetRules = [
    check('newPassword')
        .exists()
        .isLength({min: 5}),
    check('resetToken')
        .exists()
];

module.exports = {
    registrationRules,
    loginRules,
    forgotRules,
    resetRules
};
