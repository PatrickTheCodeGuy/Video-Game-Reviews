import React, { Component } from "react";
import axios from "axios";
import SidebarContainer from "./Sidebar/Sidebar";
import Header from "../Header/Header";
import "../../App.css";
import { Link } from "react-router-dom";
import CardContainer from "../GameCards/CardContainer";

class Home extends Component {
	render() {
		console.log(this.props);
		return (
			<div className="Home">
				<div className="Header-container">
					<Header />
				</div>
				<div className="Home-page">
					<CardContainer />
				</div>
			</div>
		);
	}
}

export default Home;
