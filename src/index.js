const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
});

require("./db/conn");
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require("./routes/locationRoutes");
app.use('/api', userRoutes);
app.use('/api', locationRoutes);

app.listen(port, () => {
    console.log("listening at port",port)
});