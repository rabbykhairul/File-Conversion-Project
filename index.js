const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({dest: 'uploads/'});
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/resizeImage', upload.single('image'), (req, res) => {
    const imgInfo = {
        originalFileName: req.file.originalname,
        ecoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
    };
    res.send(imgInfo);
});

app.listen(port, () => {
    console.log(`Started listening at port ${port}...`);
})