// src/test/example.test.js

import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
import app from '../server.js';

//db is cleared before and after each test. See src/test/setup.test.js

const debug = process.env.DEBUG === 'true';

describe('Example API', () => {
  const responseFormat = {
    status: 'success',
    message: 'Success!',
    data: [],
    appCode: 'OK',
    timestamp: '2023-10-01T12:00:00.000Z',
  };

  it('should have default response format', (done) => {
    chai.request
      .execute(app)
      .get('/api/v1/examples')
      .end((err, res) => {
        if (debug) console.log(res.body);
        expect(res.body).to.have.property('status', responseFormat.status);
        expect(res.body).to.have.property('message', responseFormat.message);
        expect(res.body).to.have.property('appCode', responseFormat.appCode);
        expect(res.body).to.have.property('timestamp');
        done();
      });
  });

  it('should GET all examples', (done) => {
    chai.request
      .execute(app)
      .get('/api/v1/examples')
      .end((err, res) => {
        if (debug) console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').that.is.an('array');
        done();
      });
  });

  it('should POST a new example', (done) => {
    chai.request
      .execute(app)
      .post('/api/v1/examples')
      .send({ name: 'Test Example', value: 123 })
      .end((err, res) => {
        if (debug) console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('name', 'Test Example');
        expect(res.body.data).to.have.property('value', 123);
        done();
      });
  });

  it('should have no examples initially', (done) => {
    chai.request
      .execute(app)
      .get('/api/v1/examples')
      .end((err, res) => {
        if (debug) console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data').that.is.an('array').that.is
          .empty;
        done();
      });
  });

  it('should POST a new example and then GET it', (done) => {
    chai.request
      .execute(app)
      .post('/api/v1/examples')
      .send({ name: 'Test Example', value: 123 })
      .end((err, res) => {
        if (debug) console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data').that.is.an('object');
        expect(res.body.data).to.have.property('name', 'Test Example');
        expect(res.body.data).to.have.property('value', 123);

        chai.request
          .execute(app)
          .get('/api/v1/examples')
          .end((err, res) => {
            if (debug) console.log(res.body);
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property('data')
              .that.is.an('array')
              .that.has.lengthOf(1);
            expect(res.body.data[0]).to.have.property('name', 'Test Example');
            expect(res.body.data[0]).to.have.property('value', 123);
            done();
          });
      });
  });
});
