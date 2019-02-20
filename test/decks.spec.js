const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('Cardit API decks tests', function () {
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
                }).then(() => {
                    models.Deck.create(
                        {
                            subject: 'Subject 1'
                        }
                    ).then(() => {
                        done();
                    })
                });
            });
        });
    });

    
    describe('GET /decks', function () {
        it('respond with json containing a list of all decks', function (done) {
            request(app)
                .get('/decks')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });    

    describe('GET /decks/:id', function () {
        it('respond with json deck not found', function (done) {
            request(app)
                .get('/decks/11')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /decks/:id', function () {
        it('respond with json deck found', function (done) {
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

    describe('POST /decks', function () {
        it('create new deck', function (done) {
            let subject = 'Subject 2'
      

            request(app)
                .post('/decks')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({subject})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('POST /decks', function () {
        it('return 400 if subject already exists', function (done) {
            let subject = 'Subject 2'
      

            request(app)
                .post('/decks')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({subject})
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('PUT /decks/:id', function () {
        it('updates deck by id', function (done) {
            let subject = 'New subject'

            request(app)
                .put('/decks/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({subject})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /decks/:id', function () {
        it('deletes deck by id', function (done) {
            request(app)
                .delete('/decks/1')
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