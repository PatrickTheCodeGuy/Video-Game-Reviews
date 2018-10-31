import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";

class App extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			profile_pic: ""
		};
	}
	componentDidMount() {
		let user = JSON.parse(localStorage.getItem("user"));
		axios
			.get(`http://localhost:3300/users/${user.id}`)
			.then(user => {
				this.setState({
					username: user.username,
					profile_pic: user.profile_pic
				});
			})
			.catch(err => {
				res.status(400).json({ err: "could not find user" });
			});
	}
	render() {
		return (
			<div className="Settings">
				<div>
					<Header />
				</div>
				<div>
					<Form onChange={this.handleChange} inline>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Label for="exampleEmail" className="mr-sm-2">
								Username:
							</Label>
							<Input
								type="text"
								name="username"
								id="idusername"
								placeholder="Username"
								required
							/>
						</FormGroup>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Label for="examplePassword" className="mr-sm-2">
								Password:
							</Label>
							<Input
								type="password"
								name="password"
								id="examplePassword"
								placeholder="Password"
								required
							/>
						</FormGroup>
						<Button className="register-submit" onClick={this.onSubmit}>
							Log In
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
