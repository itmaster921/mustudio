/**
 * email sender
 */

'use strict';

import nodemailer from 'nodemailer';
import Config from '../../config/environment';

var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		type: Config.email.authType,
		user: Config.email.username,
		clientId: Config.email.clientId,
		clientSecret: Config.email.clientSecret,
		refreshToken: Config.email.refreshToken
	}
});


function mail(from, email, subject, mailbody){
	var mailOptions = {
		from: from, // sender address
		to: email, // list of receivers
		subject: subject, // Subject line
		//text: result.price, // plaintext body
		html: mailbody  // html body
	};

	return smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			console.error(error);
		}
		smtpTransport.close(); // shut down the connection pool, no more messages
	});
}

module.exports.sentMailVerificationLink = function(user,token) {
	var from = Config.email.accountName + " Team<" + Config.email.username + ">";
	var rootDomain = Config.server.host + ':' +  Config.port;
	var mailbody = "<p>Thanks for Registering on "+Config.email.accountName+" </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://"+ rootDomain +"/auth/local/verifyEmailUrl/"+token+"'>Verification Link</a></p>";
	return mail(from, user.email , "Account Verification", mailbody);
};