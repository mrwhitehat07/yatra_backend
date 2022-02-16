const mongoose = require('mongoose');
const { getRequest, sendRequest, acceptRequest, declineRequest } = require("../controllers/requestController");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Trip member request testing', () => {
    it('expect request sent to join successfully', async () => {
        const trip = "620c47bc9b1e8d35d3fe246e";
        const user = "bishal@gmail.com";
        const sender = "";
        const res = await sendRequest(user, trip, sender);
        expect(res).toBe("request sent");
    });

    it('expect request accepted', async () => {
        const trip = "620c47bc9b1e8d35d3fe246e";
        const requestId = "620c9d348f5cee7fee55a5c4";
        const user = "bishal@gmail.com";
        const res = await acceptRequest(requestId, trip, user);
        expect(res).toBe("accepted");
    });

    it('expect expect request declined', async () => {
        const requestId = "620c9d348f5cee7fee55a5c4";
        const user = "bishal@gmail.com";
        const res = await declineRequest(requestId, user);
        expect(res).toBe("declined");
    });

});
 
