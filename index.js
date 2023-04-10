require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
require('./config/db')

const { seedSettings } = require("./services/seed");
seedSettings();
const useragent = require('express-useragent')
const userRouter = require('./routers/user')
const doctorRouter = require('./routers/doctor')
const appointmentRouter = require('./routers/appointment')
const purposeController = require('./routers/purpose')
const dashboardRouter = require('./routers/dashboard')
var cookieParser = require('cookie-parser')
const multer  = require('multer');
const path = require('path')

const app = express()
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

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
app.use('/doctor', doctorRouter);
app.use('/appointment', appointmentRouter)
app.use('/purpose', purposeController)
app.use(dashboardRouter)

app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

const server = app.listen(port, () => {
    console.log("MED_FRIEND Running on : localhost", process.env.PORT);
})


process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});