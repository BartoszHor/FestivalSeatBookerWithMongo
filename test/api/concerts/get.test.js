  
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
      try {
        const fakeDB = new MongoMemoryServer();

        const uri = await fakeDB.getConnectionString();

        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    } catch (err) {
        console.log(err);
    }
        const testConcertOne = new Concert({performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertOne.save();
      
        const testConcertTwo = new Concert({performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await testConcertTwo.save();

        const testConcertThree = new Concert({performer: 'John Doe', genre: 'Rock', price: 35, day: 3, image: '/img/uploads/1fsd324fsdg.jpg'});
        await testConcertThree.save();
      });

      it('/concerts should return all concerts', async () => {

        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
      
      });

      it('/concerts/performer/:performer should return all concerts of performer', async () => {

        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
      
      });

      it('/concerts/genre/:genre should return all concerts of performer', async () => {

        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
      
      });

      it('/concerts/day/:day should return all concerts of performer', async () => {

        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body).not.to.be.null
      
      });

      it('/concerts/price/:price_min/:price_max should return all concerts of performer', async () => {

        const res = await request(server).get('/api/concerts/price/10/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body).not.to.be.null
      
      });
  
     
  
    after(async () => {
        await Concert.deleteMany();
      });

  });