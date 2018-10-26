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
//Register and login for Users tables / routes

//GET req to view all the users (needs to be protected later)
server.get("/users", (req, res) => {
	db("users")
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(400).json({ error: "cannot get users" });
		});
});
// GET req that bundles reviews the user has and display them in an array
server.get("/users/:id", (req, res) => {
	const user_id = req.params.id;
	db("users")
		.where({ id: user_id })
		.then(user => {
			db("video games")
				.where({ user_id })
				.then(review => {
					user[0].reviews = review;
					res.status(200).json(user[0]);
				});
		});
});
//POST req to register a new user
//Will has the password 15 times
server.post("/register", (req, res) => {
	const credentials = req.body;
	const hash = bcrypt.hashSync(credentials.password, 15);
	credentials.password = hash;
	db("users")
		.insert(credentials)
		.then(ids => {
			const token = generateToken({ username: credentials.username });
			res.status(201).json({ ids: ids[0] });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: "Could not create User" });
		});
});
//POST req to login the user
//will has the entered password and compare to the stored hash
server.post("/login", (req, res) => {
	const creds = req.body;
	db("users")
		.where({ username: creds.username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				res.status(200).json({ welcome: user.username });
			} else {
				res
					.status(500)
					.json({ error: "Wrong Username and/or Password, please try again" });
			}
		});
});

//Video Game review routes should go below here

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
