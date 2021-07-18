require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileController = require('./controllers/fileController');
const routes = require("./routes/index");
const path = require('path');
const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/api', routes);



//mongoose connection
const uri = `mongodb+srv://file:${process.env.password}@cluster0.a86b0.mongodb.net/file?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).then(res => console.log("database connected..."))
    .catch(err => console.log(err.reason));


const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log(`server is running at ${PORT}`)
})