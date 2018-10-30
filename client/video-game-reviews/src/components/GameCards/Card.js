import React, { Component } from "react";
import axios from "axios";

import "./Card.css";
import { Link, withRouter } from "react-router-dom";

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userphoto: "",
			username: ""
		};
	}

	componentDidMount(props) {
		axios
			.get(`http://localhost:3300/users/${this.props.user_id}`)
			.then(user => {
				const { username, profile_pic } = user;
				this.setState({ userphoto: profile_pic, username: username });
			})
			.catch(err => console.log(err));
	}

	render(props) {
		return (
			<Link className="review-link" to="#">
				<div className="card">
					<div className="title">
						<div className="rating-rating">
							<p className="rating">{this.props.rating}</p>
						</div>

						<img className="main-photo" src={this.props.main_photo} />
					</div>
					<div>
						<h6 className="card-name">{this.props.name}</h6>
					</div>

					<hr className="divider" />
				</div>
			</Link>
		);
	}
}

export default withRouter(Card);
