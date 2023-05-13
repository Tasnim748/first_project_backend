const express = require('express');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
// app config
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photos')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 15 * 1024 * 1024, // Maximum file size: 5MB
    }
});

const imageRouter = require('./routers/imageRouter');
const companyRouter = require('./routers/companyRouter');


app.use('/images/', imageRouter);
app.use('/company/', companyRouter);


app.post("/upload/", upload.single("image"), (req, res) => {
    if (req.file) {
        const imageUrl = req.protocol + '://' + req.get('host') + `/photos/${req.file.filename}`;
        res.send(imageUrl);
    } else {
        res.status(400).send('No file uploaded');
    }
});

app.use(express.static('public'));

// export
module.exports = app;