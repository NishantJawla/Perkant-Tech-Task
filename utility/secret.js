require('dotenv').config()
const secret = {
    PORT : process.env.PORT,
    MONGOURL : process.env.MONGOURL,
    SECRET : process.env.SECRET
}

module.exports = secret;