const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const server = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = 6000;
const cors = require("cors");

server.use(cors());
server.use(express.json());

const jwtSecret = "thisisanappmadebypatrick";

function generateToken(user) {
	const payload = {
		...user,
		hello: "Hello!"
	};

	const JwtOptions = {
		expiresIn: "10m"
	};

	return jwt.sign(payload, jwtSecret, JwtOptions);
}

server.get("/users", (req, res) => {
	db("users")
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(400).json({ error: "cannot get users" });
		});
});

server.post("/register", (req, res) => {
	const credentials = req.body;
	const hash = bcrypt.hashSync(credentials.password, 15);
	credentials.password = hash;
	db("users")
		.insert(credentials)
		.then(ids => {
			const token = generateToken({ username: credentials.username });
			res.status(201).json({ ids: ids[0], token });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: "Could not create User" });
		});
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
