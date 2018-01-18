const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGODB_URL, { useMongoClient: true });

const app = express();
// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running at port ', PORT);
});
