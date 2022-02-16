const mongoose = require('mongoose');
const Location = require("../models/locationModel");
const { addLocations, updateLocations, deleteLocations } = require("../controllers/locationController");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Location testing', () => {
    it('expect location add succeed', async () => {
        const image = "https://res.cloudinary.com/dvcudli4n/image/upload/v1643982206/hra99r6qbyvlnxfzkr4j.jpg";
        const image_id = "hra99r6qbyvlnxfzkr4j";
        const description = "This is description";
        const city = "kathmandu";
        const country = "nepal";
        const lat = 27.3240;
        const lng = 85.7172;
        const rating = 9;
        const res = await addLocations(city, country, lat, lng, rating, image, image_id, description);
        expect(res).toBe("success");
    });

    it('expect location update succeed', async () => {
        const description = "This is updated description";
        const city = "kathmandu";
        const country = "nepal";
        const lat = 27.3240;
        const lng = 85.7172;
        const rating = 9;
        const slug = "kathmandu-nepal";
        const res = await updateLocations(slug, city, country, lat, lng, rating, description);
        expect(res).toBe("Location updated");
    });
});
 
