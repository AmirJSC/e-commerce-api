const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.SECRET;

// Token Creation
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	return jwt.sign(data, secret, {});
}

// Verification of Users
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				console.log(err);
				return res.send({auth: "failed"});
			}
			else {
				next();
			}
		})
	}
	else {
		return res.send({auth: "failed"});
	}
}

// Token Decryption
module.exports.decode = (token) => {

	if(typeof token !== "undefined") {
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (err, data) => {
			if(err) {
				return null;
			}
			else {
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}
	else {
		return null;
	}
}
