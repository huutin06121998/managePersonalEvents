require("dotenv").config();
const TEST_ENV = process.env.ENV_TESTING;
const TOKEN = process.env.TOKEN;

let chai = require("chai");
let chaiHttps = require("chai-http");

let server = require("../app");
let should = chai.should();

let expect = chai.expect;

chai.use(chaiHttps);

describe("Test In Events", () => {
    beforeEach((done) => {
        done();
    })

    describe("/GET events", () => {
        it('it should GET all the events', (done) => {
            chai.request(server)
                .get('/api/events')
                .set("Authorization", "Bearer " + TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('List All Events');
                    done();
                })
        })
    });

    describe("/UPDATE/:id event", () => {
        it('it should UPDATE a events the id', (done) => {
            const id = '632ebe376c3b03fc242e1ed3';
            const name = 'Play Football at 4h50';
            const description = 'Play Football at 4h50';
            chai.request(server)
                .patch('/api/events/' + id)
                .set("Authorization", "Bearer " + TOKEN)
                .send({
                    name: name,
                    description: description
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('Events is updated');
                    done();
                })
        })
    });

    describe('/DELETE/:id events', () => {
        it('it should DELETE a events given the id', (done) => {
            const id = '632ebe376c3b03fc242e1ed3';
            chai.request(server)
                .delete('/api/events/' + id)
                .set("Authorization", "Bearer " + TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('Event was deleted');
                    done();
                });
        });
    });

    describe("/Filter events", () => {
        it('it should filter the events', (done) => {
            chai.request(server)
                .get('/api/events/filter')
                .set("Authorization", "Bearer " + TOKEN)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                })
        })
    });
});