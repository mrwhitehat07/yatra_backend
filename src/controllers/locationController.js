const Location = require("../models/locationModel");

const addLocations = async (city, country, lat, lng) => {
    const location = new Location({
        city: city, 
        country: country, 
        coordinates: [lat, lng]
    });
    await location.save();
}

module.exports = {
    addLocations
}