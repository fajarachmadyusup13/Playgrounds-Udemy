const assert = require('assert');
const User = require('../src/user');


describe('Deleting a user', () => {
    let boo;

    beforeEach((done) => {
        boo = new User ({ name: 'boo' });
        boo.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        boo.remove()
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });
    
    it('class method remove', (done) => {
        User.remove({ name: 'boo' })
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    
    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'boo' })
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(boo._id)
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
  
})
