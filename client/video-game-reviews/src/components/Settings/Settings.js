import React, { Component } from "react";
import axios from "axios";

import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			id: 0,
			username: "",
			password: "",
			profile_pic: ""
		};
	}
	componentDidMount() {
		let user = JSON.parse(localStorage.getItem("user"));
		console.log(user.id);
		axios
			.get(`http://localhost:3300/users/${user.id}`)
			.then(user => {
				console.log(user);
				this.setState({
					id: user.data.user.id,
					username: user.data.user.username,
					password: user.data.user.password,
					profile_pic: user.data.user.profile_pic
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleChange = event => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	onSubmit = event => {
		const user = {
			id: this.state.id,
			username: this.state.username,
			password: this.state.password,
			profile_pic: this.state.profile_pic
		};
		axios.put(`http://localhost:3300/users/${user.id}`, user).then(res => {
			if (res.data.welcome !== "") {
				localStorage.setItem("user", JSON.stringify(res.data));

				console.log(res);
				this.props.history.push("/home");
			} else {
				this.props.history.push("/settings");
			}
		});
	};
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
								type="username"
								name="username"
								id="newName"
								value={this.state.username}
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
								id="newPass"
								value={this.state.password}
								required
							/>
						</FormGroup>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Label for="examplePassword" className="mr-sm-2">
								Profile Picture:
							</Label>
							<Input
								type="text"
								name="profile_pic"
								id="exampleprofilepic"
								value={this.state.profile_pic}
								required
							/>
						</FormGroup>
						<Button className="register-submit" onClick={this.onSubmit}>
							Update My Info
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

export default withRouter(Settings);
