const mongoose = require('mongoose');
const { createUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/userController");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User profile testing', () => {
    it('expect userprofile create succeed', async () => {
        const image = "https://res.cloudinary.com/dvcudli4n/image/upload/v1643982206/hra99r6qbyvlnxfzkr4j.jpg";
        const image_id = "hra99r6qbyvlnxfzkr4j";
        const fullname = "John Bahadur";
        const bio = "This is bio";
        const address = "nepal";
        const user = "61d709cc938de186d88dd331";
        const res = await createUserProfile(user, fullname, bio, image, address, image_id);
        expect(res).toBe("profile already exists");
    });

    it('expect location update succeed', async () => {
        const fullname = "John Bahadur";
        const bio = "This is bio";
        const address = "nepal";
        const user = "61d709cc938de186d88dd331";
        const res = await updateUserProfile(user, fullname, bio, address);
        expect(res).toBe("updated");
    });

    it('expect location delete', async () => {
        const user = "61d709cc938de186d88dd331";
        const res = await deleteUserProfile(user);
        expect(res).toBe("deleted");
    });
});
 
