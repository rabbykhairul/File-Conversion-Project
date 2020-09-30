class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    const errorDetails = {
        status: "Error",
        statusCode,
        message
    };
    res.status(statusCode).send(errorDetails);
};

module.exports = {
    ErrorHandler,
    handleError
};