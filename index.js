const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videoRouter = require("./routes/videosRouter");
const path = require('path');

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use("/videos", videoRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));