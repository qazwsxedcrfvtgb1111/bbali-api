const configs = {
    port: process.env.PORT || '3000',
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/bbali',
    defaultUserLanguage: 'English',
    bitcoinAddress: 'testbitcoinaddr',
    etherAddress: 'testetheraddr',
    email: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rxfbdrx4no2q5dd2@ethereal.email',
            pass: 'NXwta8UzKWZ3wayJAP'
        }
    }
};

module.exports = configs;
