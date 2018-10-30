import React, { Component } from "react";
import axios from "axios";
import SidebarContainer from "./Sidebar/Sidebar";
import Header from "../Header/Header";
import "../../App.css";
import { Link } from "react-router-dom";

class Home extends Component {
	render() {
		return (
			<div className="App">
				<div>
					<Header />
				</div>
			</div>
		);
	}
}

export default Home;
