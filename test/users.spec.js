const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('Cardit API users tests', function () {
    this.timeout(20000);
    before(function (done) {
        models.sequelize.sync({ force: true }).then(() => {
            console.log('Database rebuilt')
            models.Group.create({ name: 'Group 1' }).then(group => {
                models.User.create(
                    {
                        firstName: 'Admin',
                        lastName: 'Admin',
                        email: 'admin@admin.com',
                        passwordHash: '$2a$10$g7ILhN6usXTJ56B3sOVbwuX4LLGwumdIzeAr4s0xHabLnfSJIaKSa',
                        role: 'admin',
                        GroupId: group.id,
                        lastLogin: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                ).then((user) => {
                    global.token = jwt.sign(
                        {
                            email: user.email,
                            id: user.id,
                            role: user.role
                        },
                        config.JWT_SECRET,
                        { expiresIn: '1h' });
                    console.log('Admin user created');
                    done();
                });
            });
        });
    });

    describe('GET /users', function () {
        it('respond with json containing a list of all users', function (done) {
            request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /users/:id', function () {
        it('respond with json user not found', function (done) {
            request(app)
                .get('/users/11')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /users/:id', function () {
        it('respond with json user found', function (done) {
            request(app)
                .get('/users/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /users/:id', function () {
        it('respond with forbidden', function (done) {
            request(app)
                .get('/users/1')
                .set('Accept', 'application/json')
                .expect(403)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /users', function () {
        it('create new user', function (done) {
            let firstName = 'Elek';
            let lastName = 'Teszt';
            let email = 'teszt@elek.hu';
            let password = '1234';
            let role = 'student';
            let GroupId = 1;
      

            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({firstName, lastName, email, password, role, GroupId})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('POST /users', function () {
        it('should return 500 if password is not given', function (done) {
            let firstName = 'Elek';
            let lastName = 'Teszt';
            let email = 'teszt@elek.hu';
            let role = 'student';
            let GroupId = 1;
      

            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({firstName, lastName, email, role, GroupId})
                .expect(500)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('POST /users', function () {
        it('should return 400 if email is not given', function (done) {
            let firstName = 'Elek';
            let lastName = 'Teszt';
            let password = 'tesztelek'
            let role = 'student';
            let GroupId = 1;
      

            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({firstName, lastName, password, role, GroupId})
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('PUT /users/:id', function () {
        it('updates user by id', function (done) {
            let firstName = 'Ella'

            request(app)
                .put('/users/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({firstName})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /users/:id', function () {
        it('deletes user by id', function (done) {
            request(app)
                .delete('/users/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });  
});
