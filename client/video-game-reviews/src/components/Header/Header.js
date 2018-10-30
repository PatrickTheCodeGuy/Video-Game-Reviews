import React, { Component } from "react";
import axios from "axios";

import "../../App.css";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";

class Header extends Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
			userimg: ""
		};
	}

	componentDidMount() {
		this.setState({
			userimg:
				"https://images-na.ssl-images-amazon.com/images/I/71XdzboDLOL._UL1500_.jpg"
		});
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
	render() {
		return (
			<div className="Header">
				<div className="userpicture-hamburger">
					<Navbar color="faded" light>
						<div>
							<NavbarBrand href="/home" className="mr-auto">
								VGReviews
							</NavbarBrand>
						</div>
						<a className="imagee" href="/profile">
							<img className="user-img" src={this.state.userimg} />
						</a>

						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse isOpen={!this.state.collapsed} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="navlinks" href="/reviews/:userid">
										My Reviews
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="navlinks" href="/settings/:userid">
										Settings
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="navlinks" href="/logout">
										Logout
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
			</div>
		);
	}
}

export default Header;
