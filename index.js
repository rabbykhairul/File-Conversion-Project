const express = require("express");
const app = express();
const { ErrorHandler, handle_error } = require("./helpers/errors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const resizeImage = require("./routes/resizeImage");
app.use("/api/resizeImage", resizeImage);

app.use((err, req, res, next) => {
  handle_error(err, res);
});

app.listen(port, () => {
  console.log(`Started listening at port ${port}...`);
});
