const mongoose = require("mongoose");
const url = process.env.DB_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('couldnot connect to db'));
db.once('open', () => console.log(`connection success ${db.name}`));