const chai = require('chai');
const chaiHttp = require ('chai-http');
const should = chai.should();
const server = require ('../app');

chai.use(chaiHttp);

let token;
let deleteId;
describe('"Books" Endpoint Tests',() => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: "admin1", password: 12345678})
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    })
    describe('POST a new book', () => {
        it("It should POST a new book", (done) => {
            const testBook =
                {
                    title: "Kayıp Tanrılar Ülkesi",
                    author: {
                        name: "Ahmet",
                        surname: "Ümit"
                    },
                    publishedAt: 2021,
                    reviews: {
                        comment: "Dün öğle saatlerinde okumaya başladığım kitabı gece yarısı elimden bırakabildim!",
                        vote: 5
                    },
                    token: token,
                };
            chai.request(server)
                .post("/books/new")
                .send(testBook)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('publishedAt');
                    deleteId = res.body._id;
                    done();
                })

        })
    })

    describe('DELETE the book', () => {
        it("It should DELETE the book", (done) => {
            chai.request(server)
                .delete("/books/delete/" + deleteId)
                .send({token})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author');
                    res.body.should.have.property('publishedAt');
                    done();
                })

        })
    })
})


