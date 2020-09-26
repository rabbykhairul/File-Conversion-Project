const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({dest: 'uploads/'});
const port = process.env.PORT || 3000;

app.use(express.json());


app.listen(port, () => {
    console.log(`Started listening at port ${port}...`);
})