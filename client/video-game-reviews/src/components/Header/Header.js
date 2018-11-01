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
			userimg: "",
			id: null
		};
	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem("user"));
		axios
			.get(`http://localhost:3300/users/${user.id}`)
			.then(users => {
				this.setState({ userimg: users.data.user.profile_pic });
			})
			.catch(err => console.log(err));
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
									<NavLink className="navlinks" href="/settings">
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
