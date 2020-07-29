const app = require('./app')
const request = require('supertest')
const assert = require('chai').assert

describe('blogs', () => {
    it("gets a list of blogs", done => {
        request(app)
            .get('/api/blogs')
            .expect(200)
            .end(function(err, response) {
                if (err) return done(err)
                assert(Object.keys(response.body[0]), ["_id", "blogTitle", "paragraphs"])
                done()
            })
    })
})