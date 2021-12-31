const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/demoDb')
    .then(() => console.log("Demo : Database connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;