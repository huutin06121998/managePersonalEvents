//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
require("dotenv").config();

//During the test the env variable is set to test
const ENV = process.env.ENV_TESTING;

chai.use(chaiHttp);
//Our parent block
describe('Events', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET api/events', () => {
        it('it should GET all the events', (done) => {
            chai.request(server)
                .get('/api/events')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
});
