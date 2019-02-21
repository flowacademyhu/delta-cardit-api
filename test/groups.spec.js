const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('Cardit API groups tests', function () {
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
                    models.Deck.create(
                        {
                            subject: 'Subject1'
                        }
                    ).then(() => {
                        done();
                    })
                });
            });
        });
    });

    describe('GET /groups', function () {
        it('respond with json containing a list of all groups', function (done) {
            request(app)
                .get('/groups')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /groups/:id', function () {
        it('respond with json group not found', function (done) {
            request(app)
                .get('/groups/11')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /groups/:id', function () {
        it('respond with json group found', function (done) {
            request(app)
                .get('/groups/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /groups', function () {
        it('create new group', function (done) {
            let name = 'name2';
            let deckId = 1;         
      
            request(app)
                .post('/groups')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({name, deckId})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });

        });
    });

    describe('PUT /groups/:id', function () {
        it('updates group by id', function (done) {
            let name = 'Name2'

            request(app)
                .put('/groups/1')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .send({name})
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('DELETE /groups/:id', function () {
        it('deletes group by id', function (done) {
            request(app)
                .delete('/groups/1')
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
