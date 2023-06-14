const response = (res, result, status, statusCode, message, pagination) => {
    const print = {}
    print.data = result
    print.status = status
    print.statusCode = statusCode
    print.message = message
    if(pagination)print.pagination = pagination
    res.status(statusCode).json(print)
}

module.exports = {
    response
}