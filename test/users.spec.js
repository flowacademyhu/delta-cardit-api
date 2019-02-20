const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('Cardit API users tests', function () {
    this.timeout(10000);
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

    describe('POST /users', function () {
        it('create new user', function (done) {
            request(app)
                .post('/users')
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