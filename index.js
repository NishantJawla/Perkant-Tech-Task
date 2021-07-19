const express = require('express');
const app = express();
const secret = require('./utility/secret');
app.listen(7000,()=> {
    console.log('listening on 7000')
})