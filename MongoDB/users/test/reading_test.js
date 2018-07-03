const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let boo, moo, poo, doo;

  beforeEach((done) => {
    boo = new User({ name: 'boo' });
    moo = new User({ name: 'moo' });
    poo = new User({ name: 'poo' });
    doo = new User({ name: 'doo' });

    Promise.all([boo.save(), moo.save(), poo.save(), doo.save()])
      .then(() => done());
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

  it('can skip and limit result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => { 
        assert(users.length === 2);
        assert(users[0].name === 'doo');
        assert(users[1].name === 'moo');
        done();
      })
  })
  

});
