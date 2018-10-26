const jwt = require("jsonwebtoken");

const jwtKey = require("./secret/keys.js").jwtKey;

module.exports = {
	authenticate
};

function authenticate(req, res, next) {
	const token = req.get("Authorization");

	if (token) {
		console.log(token);
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) return res.status(401).json(err);

			req.decoded = decoded;

			next();
		});
	} else {
		return res.status(401).json({
			error: "No token provided"
		});
	}
}
