const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/database').secret;
const User = require('../models/User');

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};


const Post = require('../models/Posts');

router.get('/posts', (req, res) => {
  Post.find({},function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
    })
	}).sort({_id:-1})
});

router.get('/myposts/:id', (req, res) => {
    var uid=req.params.id
    Post.find({userid:uid},function (error, posts) {
        if (error) { console.error(error); }
        console.log(posts);
        res.send({
          posts: posts
      })
      }).sort({_id:-1})
  });

router.post('/add_post', (req, res) => {
	var title = req.body.title;
  var description = req.body.description;
  var userid=req.body.userid;
  var urls=req.body.urls;
  var uid=req.body.uid;
	var new_post = new Post({
	title: title,
    content: description,
    urls:urls,
    userid:uid
	});

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
      success: true,
		});
	});
});

router.post('/updateposts/:id', (req, res) => {
	Post.findById(req.params.id, function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title;
	  post.content = req.body.description;
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
});

router.delete('/posts/:id', (req, res) => {
	Post.findByIdAndRemove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		});
	});
});

router.get('/post/:id', (req, res) => {
	Post.findById(req.params.id,function (error, post) {
	  if (error) { console.error(error); }
	  res.send({
			posts: post
		});
	});
});



/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique Username
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            });
        }
    })
    // Check for the Unique Email
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password."
            });
        }
    });
    // The data is valid and new we can register the user
    let newUser = new User({
        name,
        username,
        password,
        email
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Hurry! User is now registered."
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Hurry! You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: serializeUser(req.user)
    });
});
module.exports = router;
