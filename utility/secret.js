require('dotenv').config()
const secret = {
    PORT : process.env.PORT,
    MONGOURL : process.env.MONGOURL
}

module.exports = secret;