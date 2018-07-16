const User = require('../models/User');
const config = require('../config');
const promisify = require('util').promisify;
const randomBytes = promisify(require('crypto').randomBytes);
const hash = promisify(require('bcrypt').hash);
const compare = promisify(require('bcrypt').compare);
const LoginFailed = require('../exceptions/LoginFailed');
const InvalidToken = require('../exceptions/InvalidToken');
const MailService = require('../services/MailService');
const mailService = new MailService();

class UserController {
    async login({email, phone, password, userLat, userLon}) {
        let user = null;
        if (email) {
            user = await User.findOne({email}).exec();
        } else {
            user = await User.findOne({phone}).exec();
        }

        if (!user) {
            throw new LoginFailed();
        }

        const res = await compare(password, user.password);
        if (res) {
            if (userLon && userLat) {
                user.loginLocations.push({coordinates: [userLat, userLon]});
                user.save();
            }
            return {
                msg: 'user account successfully created',
                data: {
                    status: '@todo',
                    currentStatus: '@todo',
                    userAuth: user.token,
                    language: user.language,
                }
            };
        }
        throw new LoginFailed();

    }

    async register({email, phone, selectedLanguage, fullName, password, userLat, userLon}) {
        const userData = {
            email, phone,
            language: selectedLanguage || config.defaultUserLanguage,
            fullName,
        };
        if (userLat && userLon) {
            userData.registerLocation = {coordinates: [userLat, userLon]};
        }
        const hashedPass = await hash(password, 10);
        const buffer = await randomBytes(100);

        userData.password = hashedPass;
        userData.token = buffer.toString('hex');

        const user = new User(userData);

        await user.save();

        return {
            msg: 'user account successfully created',
            data: {
                userEmail: user.email,
                userPhone: user.phone,
                userAuth: user.token,
                bitcoinAddress: config.bitcoinAddress,
                etherAddress: config.etherAddress,
            }
        };
    }

    async resetPassword({resetToken, newPassword}) {
        const user = await User.findOne({emailResetToken: resetToken});
        if (!user) {
            throw new InvalidToken();
        }
        user.password = await hash(newPassword, 10);
        user.emailResetToken = null;
        await user.save();
        return {
            msg: 'Password successfully changed',
            data: {
                email: user.email
            }
        };
    }

    async forgotPassword({email}) {
        const user = await User.findOne({email});
        if (user) {
            const buffer = await randomBytes(32);
            user.emailResetToken = buffer.toString('hex');
            await user.save();
            mailService.sendResetToken(user.email, user.emailResetToken);
        }
        return {
            msg: 'E-mail sent with reset instructions',
            data: {
                email
            }
        };
    }
}

module.exports = UserController;
