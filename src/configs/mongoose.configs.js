const mongoose = require("mongoose");

require("dotenv").config();
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hj8tc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(URI, { useUnifiedTopology: true })
    .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

