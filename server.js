const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');


dotenv.config({path: "./config.env"})

const apiRouter  = require("./routes/apiRoutes");

const app = express();

app.options("*", cors());

app.use(helmet({
    frameguard: false,
    crossOriginResourcePolicy: false,
}))

app.use(cors());
app.use(xss());

app.use(express.json({limit: "100kb"}));



const port = process.env.PORT || 4000;

app.use("/api/v1", apiRouter)

app.listen(port, () => {

    console.log(`Listen on ${port}`)
});