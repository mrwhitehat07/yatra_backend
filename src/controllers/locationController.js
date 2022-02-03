const Location = require("../models/locationModel");

const addLocations = async (city, country, lat, lng, ratings, image) => {
    const location = new Location({
        slug: city.toLowerCase() + "-" + country.toLowerCase(),
        city: city, 
        country: country, 
        lat: lat,
        lng: lng,
        ratings: ratings,
        image: image
    });
    await location.save();
}

const updateLocations = async (slug, city, country, lat, lng, ratings) => {
    await Location.updateOne(
        { slug: slug }, 
        { 
            $set: {
                city: (city != null) ? city : this.city,
                country: (country != null) ? country : this.country,
                lat: (lat != null) ? lat : this.lat,
                lng: (lng != null) ? lng : this.lng,
                ratings: (ratings != null) ? ratings : this.ratings,
            }
        },
    );
}

const updateLocationImage = async (slug, image) => {
    await Location.updateOne(
        { slug: slug }, 
        { 
            $set: {
                image: (image != null) ? image : this.image,
            }
        },
    );
}

const deleteLocations = async (slug) => {
    await Location.deleteOne({ slug: slug });
}

module.exports = {
    addLocations,
    updateLocations,
    updateLocationImage,
    deleteLocations
}