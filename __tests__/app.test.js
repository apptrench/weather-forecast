const request = require('supertest');
const app = require('../app')

describe("Test Request validations ", () => {
  it("should throw 400 error for empty city", async () => {
    await request(app)
      .get('/forecast')
      .expect(400)
      .then(response => {
        expect(response.text).toContain('\"city\" is required.')
      });
  })

  it("should throw 400 error for invalid order", async () => {
    await request(app)
      .get('/forecast?city=Bangalore&orderBy=increasing')
      .expect(400)
      .then(response => {
        expect(response.text).toContain('\"orderBy\" must be one of [asc, desc].')
      });
  })

  it("should return successful response for valid city and orderBy", async () => {
    await request(app)
      .get('/forecast?city=Bangalore&orderBy=asc')
      .expect(200)
  })
});
