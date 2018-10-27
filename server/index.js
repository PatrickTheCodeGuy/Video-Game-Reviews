const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const server = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const port = 3300;
const cors = require("cors");
const { authenticate } = require("./authenitcate");
const jwtSecret = require("./secret/keys.js").jwtKey;
server.use(helmet());
server.use(cors());
server.use(express.json());

function generateToken(user) {
	const payload = {
		...user,
		hello: "Hello!"
	};

	const JwtOptions = {
		expiresIn: "2h"
	};

	return jwt.sign(payload, jwtSecret, JwtOptions);
}
//Register and login for Users tables / routes

//GET req to view all the users (added authenticate middleware for protection)
server.get("/users", authenticate, (req, res) => {
	db("users")
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(400).json({ error: "cannot get users" });
		});
});
// GET req that bundles reviews the user has and display them in an array  (added authenticate middleware for protection)
server.get("/users/:id", authenticate, (req, res) => {
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
			res.status(201).json({ ids: ids[0], token });
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
				const token = generateToken(user);
				res.status(200).json({ welcome: user.username, token: token });
			} else {
				res
					.status(500)
					.json({ error: "Wrong Username and/or Password, please try again" });
			}
		});
});
//Puts the image url in profile_pic
server.put("/users/:id/profilepic", authenticate, (req, res) => {
	const id = req.params.id;
	const { imageUrl } = req.body;
	db("users")
		.where({ id: id })
		.update({ profile_pic: imageUrl })
		.then(user => {
			res.status(200).json({ imageurl: imageUrl });
		})
		.catch(err => {
			res.status(400).json({ error: "could not add image" });
		});
});
//Will DELETE user when given user id.  Need to check if deleting user cascades their reviews. (deletes their reviews)
server.delete("/users/:id", authenticate, (req, res) => {
	const id = req.params.reviewid;
	db("users")
		.where({ id: id })
		.del()
		.then(deleted => {
			res.status(200).json(deleted);
		});
});

//Video Game review routes should go below here

//get an array of all the reviews made, regardless of who made it
server.get("/review", (req, res) => {
	db("video games")
		.then(review => {
			res.status(200).json(review);
		})
		.catch(err => {
			res.status(400).json({ error: "cannot get users" });
		});
});
//find review by id
server.get("/review/:id", authenticate, (req, res) => {
	const id = req.params.id;
	db("video games")
		.where({ id: id })
		.first()
		.then(review => {
			res.status(200).json(review);
		});
});
//create a new review and bind the id of the user table to the review user_id foriegn key
server.post("/review/:id", (req, res) => {
	const id = req.params.id;
	console.log(id);
	const user_id = id;
	console.log(user_id);
	const {
		name,
		reviewText,
		rating,
		release,
		helpful,
		main_photo,
		extra_photos
	} = req.body;
	const review = {
		user_id,
		name,
		reviewText,
		rating,
		release,
		helpful,
		main_photo,
		extra_photos
	};
	console.log(review);
	db("video games")
		.insert(review)
		.then(review => {
			res.status(200).json(review);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "could not create review" });
		});
});
//updates the reviews. Front end will need to populate the respective forms with the previous data, and then submit new data.
server.put("/reviews/:reviewid", authenticate, (req, res) => {
	const id = req.params.id;
	const {
		name,
		reviewText,
		rating,
		release,
		helpful,
		main_photo,
		extra_photos
	} = req.body;
	const review = {
		user_id,
		name,
		reviewText,
		rating,
		release,
		helpful,
		main_photo,
		extra_photos
	};
	db("video games")
		.where({ id })
		.update(review)
		.then(review => {
			res.status(200).json(review);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "could not create review" });
		});
});
//Delete request by review ID, will delete the review regardless of user id
server.delete("/review/:reviewid", authenticate, (req, res) => {
	const id = req.params.reviewid;
	db("video games")
		.where({ id: id })
		.del()
		.then(deleted => {
			res.status(200).json(deleted);
		});
});
server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
