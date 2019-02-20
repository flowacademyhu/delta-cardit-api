const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('Cardit API cards tests', function () {
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
                }).then(()=> {
                    models.Card.create(
                        {
                            question: 'Question1',
                            answer: 'Answer1',
                            type: 'szabadszavas',
                            difficulty: 1
                        }
                    ).then(() => {
                        done();
                    })
                });
            });
        });
    });

    describe('GET /cards', function () {
        it('respond with json containing a list of all cards', function (done) {
            request(app)
                .get('/cards')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /cards/:id', function () {
        it('respond with json containing one card', function (done) {
            request(app)
                .get('/cards/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /cards', function () {
        it('create new card', function (done) {
            let question = 'Question2';
            let answer = 'Answer2';
            let type = 'szabadszavas';
            let difficulty = 2;
               
            request(app)
                .post('/cards')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({question, answer, type, difficulty})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('PUT /cards/:id', function () {
        it('updates card by id', function (done) {
            let question = 'New question2'

            request(app)
                .put('/cards/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({question})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /cards/:id', function () {
        it('deletes card by id', function (done) {
            request(app)
                .delete('/cards/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });


})