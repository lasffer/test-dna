const {app} = require('../bin/www')
const supertest = require("supertest");
const api = supertest(app);

describe("Test para el DNA", () => {
  test("PORT Method", async () => {
    for (let index = 0; index < 1000; index++) {
      await api.post("/mutation", { dna: [] }).expect(403);    
    }
  });
  test("PORT Method", async () => {
    for (let index = 0; index < 1000; index++) {
      await api.post("/mutation")
      .send({ dna: ["AAAAGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }).expect(200);    
    }
  });
  test("Data", async () => {
    await api.get("/stats").expect(200);    
    
  });
});
