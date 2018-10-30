import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Link, withRouter } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<div className="App">
				<div>
					<h1>VGReivews</h1>
					<Link to="/login">Enter</Link>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
