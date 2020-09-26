const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

app.use(express.json());
app.use(express.static('public'));

app.post('/api/resizeImage', upload.single('image'), (req, res) => {
    const imgInfo = {
        originalFileName: req.file.originalname,
        ecoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size + " bytes",
        path: req.file.path
    };
    res.send(imgInfo);
});

app.listen(port, () => {
    console.log(`Started listening at port ${port}...`);
})