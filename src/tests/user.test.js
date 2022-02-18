const mongoose = require('mongoose');
const User = require("../models/userModel");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User testing', () => {
    it('expect user register succeed', async () => {
        const userData = {
            email: "user4@test.com",
            password: "user123"
        };
        return await User.create(userData)
        .then((res) => {
            expect(res.email).toBe("user4@test.com");
        })
    });

});
 
