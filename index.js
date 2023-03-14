require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
require('./config/db')

const { seedSettings } = require("./services/seed");
seedSettings();
const useragent = require('express-useragent')
const userRouter = require('./routers/user')
var cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())

const port = process.env.PORT || 7795
// app.use(cors())

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})
app.use(useragent.express())
app.use(cookieParser())
app.use(userRouter);

const server = app.listen(port, () => {
    console.log("MED_FRIEND Running on : localhost", process.env.PORT);
})


process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});