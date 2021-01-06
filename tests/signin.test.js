// Tests relative to the sign in fonctionnality

var buildApp = require('../src/app')
var request = require('supertest')
const connection = require('../src/db/connection')
const mongoose = require('mongoose');
const UserModel = require('../src/db/models/user');

const app = buildApp();

describe('Test on sign in functionnality', () => {

  beforeAll(() => {
    connection();
  })

  beforeEach(async () => {
    // Clears the database and adds some testing data.
    await UserModel.deleteMany()

    var userTest = new UserModel({
      email: 'email@email.com',
      password: 'blabla',
      name: 'test',
      firstname: 'test',
      salt: 'test',
      status: 'fan',
      token: 'test'
    });

    return userTest.save()
  })


  afterAll((done) => {
    // Closing the DB connection 
    mongoose.disconnect(done);
  });


  test('wrong domain email', async (done) => {
    await request(app).post('/user/sign-in')
      .send({
        'email': 'email@email.fr',
        'password': 'test'
      })
      .expect(200)
      .expect({
        result: false,
        data: { token: null, status: null },
        error: [
          '"email" must be a valid email'
        ]
      })

    done();
  })

  test('inexisting email', async (done) => {
    await request(app).post('/user/sign-in')
      .send({
        'email': 'email@emailtest.com',
        'password': 'test'
      })
      .expect(200)
      .expect({
        result: false,
        data: { token: null, status: null },
        error: ['inexisting email']
      })

    done();
  })

  test('wrong password', async (done) => {
    await request(app).post('/user/sign-in')
      .send({
        'email': 'email@email.com',
        'password': 'testt'
      })
      .expect(200)
      .expect({
        result: false,
        data: { token: null, status: null },
        error: ['wrong password']
      })

    done();
  })


  // test('sign in successfull', async (done) => {

  //   let user = await UserModel.find({email:'email@email.com'})
  //   console.log('USER PASS : ', user[0].password)
  //   await request(app).post('/user/sign-in')
  //     .send({
  //       'email': 'email@email.com',
  //       'password': 'blabla'
  //     })
  //     .expect(200)
  //     .expect({
  //       result: true,
  //       data: {
  //         token: expect.any(String),
  //         status: 'fan',
  //         firstname: 'test',
  //         name: 'test',
  //         email: 'email@email.com',
  //         avatar: expect.any(String),
  //         nationality: expect.any(String),
  //         favorites: expect.any(String)
  //       },
  //       error: []
  //     })

  //   done();
  // })
})