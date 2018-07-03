const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
  let boo, blogPost;

  beforeEach((done) => {
    boo = new User({ name: 'boo' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    boo.blogPosts.push(blogPost);

    Promise.all([boo.save(), blogPost.save()])
      .then(() => {
        done();
      });
  });

  it('users clean up dangling blogposts on remove', (done) => {
    boo.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  })
  
})
