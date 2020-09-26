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

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        validImage(file, cb);
    }
});

app.use(express.json());
app.use(express.static('public'));

function validImage(file, cb) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileMime = file.mimetype;

    const imageTypes = [ '.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.tif', '.tiff', '.webp' ];
    const mimetypes = [ 'image/apng', 'image/bmp', 'image/gif', 'image/x-icon', 'image/jpeg', 'image/png', 'image/tiff', 'image/webp' ];

    if (imageTypes.includes(fileExt) && mimetypes.includes(fileMime)) {
        return cb(null, true);
    }
    else {
        return cb('Error: only image files are allowed');
    }
}

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