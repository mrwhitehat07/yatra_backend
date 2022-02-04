const Location = require("../models/locationModel");

const addLocations = async (city, country, lat, lng, ratings, image, image_id) => {
    const location = new Location({
        slug: city.toLowerCase() + "-" + country.toLowerCase(),
        city: city, 
        country: country, 
        lat: lat,
        lng: lng,
        ratings: ratings,
        image: image,
        image_id: image_id
    });
    await location.save();
}

const updateLocations = async (slug, city, country, lat, lng, ratings, image, image_id) => {
    await Location.updateOne(
        { slug: slug }, 
        { 
            $set: {
                city: (city != null) ? city : this.city,
                country: (country != null) ? country : this.country,
                lat: (lat != null) ? lat : this.lat,
                lng: (lng != null) ? lng : this.lng,
                ratings: (ratings != null) ? ratings : this.ratings,
                image: (image != null) ? image : this.image,
                image_id: (image_id != null) ? image_id: this.image_id,
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
    deleteLocations
}