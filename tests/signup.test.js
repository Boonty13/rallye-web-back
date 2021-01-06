// Tests relative to the sign up fonctionnality

var buildApp = require('../src/app')
var request = require('supertest')
const connection = require('../src/db/connection')
const mongoose = require('mongoose');
const UserModel = require('../src/db/models/user');

const app = buildApp();

describe('Test on sign up functionnality', () => {

  beforeAll(() => {
    connection();
  })

  beforeEach(async () => {
    // Clears the database and adds some testing data.
    await UserModel.deleteMany()

    var userTest = new UserModel({
      email: 'test@email.com',
      password: 'test',
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
    await request(app).post('/user/sign-up')
      .send({
        'email': 'test@email.fr',
        'password': 'test',
        'name': 'test',
        'firstname': 'test'
      })
      .expect(200)
      .expect({
        recorded: false,
        error: ['"email" must be a valid email']
      })

    done();
  })

  test('existing email', async (done) => {
    await request(app).post('/user/sign-up')
      .send({
        'email': 'test@email.com',
        'password': 'test',
        'name': 'test',
        'firstname': 'test'
      })
      .expect(200)
      .expect({
        recorded: false,
        error: ['email existant']
      })

    done();
  })

  test('short password', async (done) => {
    await request(app).post('/user/sign-up')
      .send({
        'email': 'test@email.com',
        'password': 'te',
        'name': 'test',
        'firstname': 'test'
      })
      .expect(200)
      .expect({
        recorded: false,
        error: ['"password" length must be at least 3 characters long']
      })

    done();
  })

  // test('sign up successfull', async (done) => {
  //   await request(app).post('/user/sign-up')
  //     .send({
  //       'email': 'test@emailtest.com',
  //       'password': 'test',
  //       'name': 'test',
  //       'firstname': 'test'
  //     })
  //     .expect(200)
  //     .expect({
  //       recorded: true,
  //       data: {
  //         favorite: [],
  //         _id: expect.any(String),
  //         firstname: 'test',
  //         name: 'test',
  //         email: 'test@emailtest.com',
  //         password:  expect.any(String),
  //         token:  expect.any(String),
  //         status: 'fan',
  //         salt:  expect.any(String),
  //         __v: 0
  //       },
  //       error: []
  //     })

  //   done();
  // })
})

