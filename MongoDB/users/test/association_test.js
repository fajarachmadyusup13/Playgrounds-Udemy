const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let boo, blogPost, comment;

  beforeEach((done) => {
    boo = new User({ name: 'boo' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    boo.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = boo;

    Promise.all([boo.save(), blogPost.save(), comment.save()])
      .then(() => {
        done();
      });
  });

  it.only('saves a relation between a user and a blogspot', (done) => {
    User.findOne({ name: 'boo' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great')
        done();
      });
  });
  
  it.only('saves a full relation graph', (done) => {
    User.findOne({ name: 'boo' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model:'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'boo');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'boo');
        done();
      });
  });
  
})
