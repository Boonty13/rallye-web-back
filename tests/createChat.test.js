// Tests relative to the creation of chat room

var buildApp = require('../src/app')
var request = require('supertest')
const connection = require('../src/db/connection')
const mongoose = require('mongoose');
const ChatModel = require('../src/db/models/chat')

const app = buildApp();

describe('Test on create chat functionnality', () => {

  beforeAll(async () => {
    connection();
    await ChatModel.deleteMany()
  })

  afterAll((done) => {
    // Closing the DB connection 
    mongoose.disconnect(done);
  });

  test('new room', async (done) => {
    await request(app).post('/admin/chat')
      .send({
        'room': 'Officiel',
        'members': []
      })
      .expect(200)
      
    done();
  })

})

