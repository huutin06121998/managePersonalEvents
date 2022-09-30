const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const eventRoutes = require('./src/routes/event.routes');
const userRoutes = require('./src/routes/user.routes');
const configMongoose = require('./src/configs/mongoose.configs');

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

require("dotenv").config();
const PORT = process.env.PORT;

// Call mongoose
configMongoose;

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});

app.use('/api/', eventRoutes);
app.use('/user/', userRoutes);

module.exports = app;