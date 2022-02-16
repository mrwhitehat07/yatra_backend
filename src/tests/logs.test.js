const mongoose = require('mongoose');
const { createLogs, updateLogs, deleteLogs } = require("../controllers/logsController");
const url = 'mongodb://localhost:27017/web-api-test';

beforeAll(() => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Logs testing', () => {
    it('expect logs added succeed', async () => {
        const image = "https://res.cloudinary.com/dvcudli4n/image/upload/v1643982206/hra99r6qbyvlnxfzkr4j.jpg";
        const description = "This is description";
        const title = "Test visit";
        const date = "2014-01-22T00:00:00.000+00:00";
        const location = "kathmandu-nepal";
        const user = "61d709cc938de186d88dd331";
        const res = await createLogs(user, location, title, description, image, date);
        expect(res).toBe("created");
    });

    it('expect logs update succeed', async () => {
        const description = "This is updated description";
        const user = "61d709cc938de186d88dd331";
        const location = "kathmand-nepal";
        const title = "updated title";
        const slug = "kathmandu-61b72b7e31eb3c0554d7ff6bnepalkathmandu-nepal";
        const date = "2014-01-22T00:00:00.000+00:00";
        const res = await updateLogs(user, slug, location, title, description, date);
        expect(res).toBe("updated");
    });

    it('expect location delete', async () => {
        const slug = "kathmandu-nepal";
        const user = "61d709cc938de186d88dd331";
        const res = await deleteLogs(slug, user);
        expect(res).toBe("deleted");
    });
});
 
