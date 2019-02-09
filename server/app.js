const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://localhost/fancy-todo')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.use('/', routes)

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
