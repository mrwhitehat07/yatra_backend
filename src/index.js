const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.PORT;
const corsConfig = require("./config/cors.config");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
});

require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const locationRoutes = require("./routes/locationRoutes");
const logsRoutes = require("./routes/logsRoutes");
const tripRoutes = require("./routes/tripRoutes");
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', locationRoutes);
app.use('/api', logsRoutes);
app.use('/api', tripRoutes);

app.listen(port, () => {
    console.log("listening at port",port)
});