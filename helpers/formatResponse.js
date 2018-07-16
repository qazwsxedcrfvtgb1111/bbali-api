module.exports = (res, message, data) => {
    res.json({
        error: false,
        msg: message,
        data
    });
};
