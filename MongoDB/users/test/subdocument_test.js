const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const boo = new User({
            name: 'boo',
            posts: [{ title: 'boo in zoo' }]
        });

        boo.save()
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user.posts[0].title === 'boo in zoo');
                done();
            });
    });

    it('can add subdocuments to an existing record', (done) => {
        const boo = new User({
            name: 'boo',
            posts: []
        });

        boo.save()
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                user.posts.push({ title: 'new post' });
                return user.save();
            })
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user.posts[0].title === 'new post');
                done();
            });
            
    });

    it('can remove an existing subdocument', (done) => {
        const boo = new User({
            name: 'boo',
            posts: [{ title: 'new post' }]
        });

        boo.save()
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'boo' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    })
    
  
});
