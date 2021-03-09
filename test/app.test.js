const { expect } = require("chai");
const supertest = require("supertest");
// can also call supertest "request"
// const request = require("supertest");
// describe("Express App", () => {
//  it("shoulder return a message from GET /", () => {
//    return request(app).get("/").expect(200, "Hello Express!"
//  });
//});
const app = require("../app");

describe("Express App", () => {
  it("shoulder return a message from GET /", () => {
    return supertest(app).get("/").expect(200, "Hello Express!");
  });
});

describe("GET /quotient", () => {
  it("8/4 should be 2", () => {
    return supertest(app)
      .get("/quotient")
      .query({ a: 8, b: 4 })
      .expect(200, "8 divided by 4 is 2");
  });

  it(`should return 400 if 'a' is missing`, () => {
    return supertest(app)
      .get("/quotient")
      .query({ b: 4 })
      .expect(400, "Value for a is needed");
  });
});
