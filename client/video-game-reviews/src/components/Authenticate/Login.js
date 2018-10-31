import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}
	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onSubmit = event => {
		const user = {
			username: this.state.username,
			password: this.state.password
		};
		axios.post("http://localhost:3300/login", user).then(res => {
			if (res.data.welcome !== "") {
				localStorage.setItem("user", JSON.stringify(res.data));
				console.log(res);
				this.props.history.push("/home");
			} else {
				this.props.history.push("/");
			}
		});
	};

	render() {
		return (
			<div className="Register">
				<h1 className="header">VGReviews</h1>
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
				<>
					<h6 className="already-login">
						Need to Register? Click <Link to="/register">Here</Link> to
						register.
					</h6>
				</>
			</div>
		);
	}
}

export default Login;
