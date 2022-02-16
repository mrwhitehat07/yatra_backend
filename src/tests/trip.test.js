const mongoose = require('mongoose');
const { createTrips, updateTrips, deleteTrips } = require("../controllers/tripController");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Trips testing', () => {
    it('expect trips create succeed', async () => {
        const title = "John Bahadur";
        const description = "This is bio";
        const date = "2014-01-22T00:00:00.000+00:00";
        const address = "nepal";
        const user = "61d709cc938de186d88dd331";
        const res = await createTrips(user, title, description, address, date);
        expect(res).toBe("Trip created successfully");
    });

    it('expect location update succeed', async () => {
        const title = "John Bahadur";
        const description = "This is bio";
        const date = "2014-01-22T00:00:00.000+00:00";
        const address = "nepal";
        const user = "61d709cc938de186d88dd331";
        const tid = "620c47bc9b1e8d35d3fe246e";
        const res = await updateTrips(user, tid, title, description, address, date);
        expect(res).toBe("Trips plans updated successfully");
    });

    it('expect location delete', async () => {
        const user = "61d709cc938de186d88dd331";
        const tid = "620c47bc9b1e8d35d3fe246e";
        const res = await deleteTrips(user, tid);
        expect(res).toBe("Trips cancelled successfully");
    });
});
 
