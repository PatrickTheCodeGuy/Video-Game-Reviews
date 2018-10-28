import React, { Component } from "react";
import axios from "axios";
import "./register.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Register extends Component {
	constructor(props) {
		super(props);
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

		axios.post("http://localhost:3300/register", user).then(res => {
			console.log(res);
			if (res.data.id) {
				this.props.history.push("/home");
			} else {
				this.props.history.push("/register");
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
							maxLength="20"
							type="text"
							name="username"
							id="idusername"
							placeholder="Username"
							required
							title="20 characters max"
						/>
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="examplePassword" className="mr-sm-2">
							Password:
						</Label>
						<Input
							minLength="5"
							pattern=".{5,}"
							type="password"
							name="password"
							id="examplePassword"
							placeholder="Password"
							required
							title="5 characters minimum"
						/>
					</FormGroup>
					<Button className="register-submit" onClick={this.onSubmit}>
						Sign Up
					</Button>
				</Form>
				<>
					<h6 className="already-login">
						Already signed up? Click <Link to="/login">Here</Link> to login.
					</h6>
				</>
			</div>
		);
	}
}

export default withRouter(Register);
