const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let boo
    
    beforeEach((done) => {
        boo = new User({ name: 'boo' });
        boo.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'norma');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        boo.set('name', 'norma');
        assertName(boo.save(), done);
    });

    it('a model instance can update', (done) => {
        assertName(boo.update({ name: 'norma' }), done);
    });

    it('a model class can update', (done) => {
        assertName(
            User.update({ name: 'boo' }, { name: 'norma' }),
            done
        );
    });
    
    it('a model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'boo' }, { name: 'norma' }),
            done
        );
    });
    
    it('a model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(boo._id, { name: 'norma' }),
            done
        );
    });

})
