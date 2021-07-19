const express = require('express');
const app = express();
const secret = require('./utility/secret');
app.listen(secret.PORT,()=> {
    console.log('listening on 7000')
})