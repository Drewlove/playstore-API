const app = require('../app'); 
const expect = require('chai').expect; 
const request = require('supertest'); 
const playstore = require('../playstore')


describe('playstore test suite', ()=> {
    it('returns array of matches if matches', ()=> {
        return request(app)
        .get('/playstore')
        .query({app: 'candy'})
        .then(res => {
            expect(res.body).to.be.an("array")
        });
    });
    it("returns 'no matches' if no matches", ()=> {
        return request(app)
        .get('/playstore')
        .query({app: 'asdf'})
        .then(res => {
            expect(res.body).to.equal("No matches")
        });
    });
    it('requires sort if no sort given', ()=> {
        return request(app)
        .get('/playstore')
        .query({sort: 1})
        .expect(400)
        .then(res => {
            expect(res.body).to.equal('must include sort by App or Rating')
        });
    }); 
    it("requires a valid genre take 2", ()=> {
        return request(app)
        .get('/playstore')
        .query({genres: 'Puzzl'})
        .expect(400)
        .then(res => {
            expect(res.body).to.equal("Genre must include 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', or 'Card'")
        });
    });
});

