const { app, db } = require("./app");
const request = require("supertest");
const assert = require("chai").assert;

before(function () {
  db.dropCollection("blogs", function (err) {
    if (err) {
      console.log("error delete collection");
    } else {
      console.log("delete collection success");
    }
  });
  db.dropCollection("recipes", function (err) {
    if (err) {
      console.log("error delete collection");
    } else {
      console.log("delete collection success");
    }
  });
});

describe("blogs", () => {
  it("should return unauthorised without an auth token", (done) => {
    request(app).post("/api/blogs/create").send({}).expect(401, done());
  });

  it("should save a blog to the db", (done) => {
    request(app)
      .post("/api/blogs/create")
      .set({
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjFmMzY5NjBmMjdjYzMyNjFmZjZiNyIsImlhdCI6MTU5NjA2MTA1MH0.Qn7uZruLLBR0uofIE7xxhw4mh-awuIlmC14dDKYvwKI",
        Accept: "application/json",
      })
      .send({
        blogTitle: "test blog",
        paragraphs: [{ heading: "foo", content: "bar" }],
      })
      .end(function (err, response) {
        if (err) return done(err);
        assert(response.body.data.blogTitle, "test blog");
        done();
      });
  });

  it("gets a list of blogs", (done) => {
    request(app)
      .get("/api/blogs")
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        assert(Object.keys(response.body[0]), [
          "_id",
          "blogTitle",
          "paragraphs",
        ]);
        done();
      });
  });
});

describe("recipes", () => {
  it("should return unauthorised without an auth token", (done) => {
    request(app).post("/api/recipes/create").send({}).expect(401, done());
  });

  it("should save a recipe to the db", (done) => {
    request(app)
      .post("/api/recipes/create")
      .set({
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjFmMzY5NjBmMjdjYzMyNjFmZjZiNyIsImlhdCI6MTU5NjA2MTA1MH0.Qn7uZruLLBR0uofIE7xxhw4mh-awuIlmC14dDKYvwKI",
        Accept: "application/json",
      })
      .send({
        recipeTitle: "test recipe",
        ingredients: ["foo"],
        methods: ["bar"],
        serves: "1",
        description: "test",
        notes: "test",
        getURL: "bar",
      })
      .end(function (err, response) {
        if (err) return done(err);
        assert(response.body.data.recipeTitle, "test recipe");
        done();
      });
  });

  it("gets a list of recipes", (done) => {
    request(app)
      .get("/api/recipes")
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);
        assert(Object.keys(response.body[0]), [
          "ingredients",
          "methods",
          "_id",
          "recipeTitle",
          "serves",
          "description",
          "notes",
          "getURL",
          "__v",
        ]);
        done();
      });
  });
});
