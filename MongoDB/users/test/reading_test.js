const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let boo;

    beforeEach((done) => {
        boo = new User({ name: 'boo' });
        boo.save()
            .then(() => {
                done();
            });
    })
  
    it('finds all users with a name of boo', (done) => {
        User.find({ name: 'boo' })
            .then((users) => {
                assert(users[0]._id.toString() === boo._id.toString());
                done();
            });
    });
    
    it('finds a user with a particular id', (done) => {
        User.findOne({ _id: boo._id })
            .then((user) => {
                assert(user.name === 'boo');
                done();
            });
    });

});
