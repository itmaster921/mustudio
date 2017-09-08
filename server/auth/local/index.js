'use strict';

import express from 'express';
import querystring from 'querystring';
import passport from 'passport';
import {signToken} from '../auth.service';
import jwt from 'jsonwebtoken';
import {verifyEmail} from '../../api/user/user.controller';
import config from '../../config/environment';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next);
});

router.get('/verifyEmailUrl/:token', function(req, res, next) {
  var emailToken = req.params.token;
  jwt.verify(emailToken, config.email.token, function(err, decoded) {
    if(!err && decoded) {
      verifyEmail(decoded, function(result){
       return res.redirect('/?emailVerification=' + querystring.stringify(result))
      })
    } else return res.redirect('/?emailVerification=' + querystring.stringify(err))
  });
});

export default router;
