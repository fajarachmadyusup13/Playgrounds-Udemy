const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const boo = new User({
            name: 'boo',
            posts: [{ title: 'boomm' }]
        });

        boo.save()
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(boo.postCount === 1);
                done();
            });
    });
});
