const request = require('supertest');
const app = require('../index');

describe('Cardit API users tests', function () {
    /*
    before(function(done) {
        request('localhost:8000')
        .post('/users/login')
        .send({})
        .end(function(err, res) {
            token = res.body.token;
            done();
          });
    })
    */

    describe('GET /users', function () {
        it('respond with json containing a list of all users', function (done) {
            request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /user/:id', function () {
        it('respond with json user not found', function (done) {
            request(app)
                .get('/users/99')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

})
