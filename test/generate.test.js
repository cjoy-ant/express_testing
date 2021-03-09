const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("GET /generate endpoint", () => {
  it("should generate an array of 5", () => {
    return supertest(app)
      .get("/generate") // invoke the endpoint
      .query({ n: 5 }) // send the query string ?n=5
      .expect(200) // assert that you get a 200  OK status
      .expect("Content-Type", /json/)
      .then((res) => {
        // make sure you get an array
        expect(res.body).to.be.an("array");
        // array must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
        // this assertion fails
        //expect(res.body).to.eql([1, 2, 3, 4, 5]);
        //expect(res.body).to.include(5);
        expect(res.body).to.include.members([1, 2, 3, 4, 5]);
        // can use .include or .have depending on how strict you want the test to be
        // optionally, can use .a to veryfiy the type
        // and .have or .include in a single chain like this:
        //expect(res.body).to.be.an('array').that.have.members([1,2,3,4,5]);
      });
  });
});

// when comparing arrays of objects it is necessary to use .deep in the chain
// for example:
//expect{([ {x:5 }]).to.include({ x:5 })}
// fails with the message: 'AssertionError: expected [ { x: 5 } ] to include { x: 5 }'
// becuase object comparison is necesary to perform this check
// adding .deep to the chain solves this issue; i.e.,
//expect([ { x:5 }]).to.deep.include({ x:5 })
