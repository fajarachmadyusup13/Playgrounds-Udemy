const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const boo = new User({ name: 'boo' });

        boo.save()
            .then(() => {
                assert(!boo.isNew);
                done();
            });
    });
})
