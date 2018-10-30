import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Card.css";
import { Link, withRouter } from "react-router-dom";

class CardContainer extends Component {
	constructor() {
		super();
		this.state = {
			reviews: []
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:3300/review")
			.then(reviews => {
				this.setState({ reviews: reviews.data });
			})
			.catch(error => {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="Card-Container">
				<div className="cards">
					{this.state.reviews.map(review => (
						<Card
							review={review}
							key={review.id}
							name={review.name}
							reviewText={review.reviewText}
							rating={review.rating}
							release={review.release}
							user_id={review.user_id}
							main_photo={review.main_photo}
							extra_photos={review.extra_photos}
							helpful={review.helpful}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default withRouter(CardContainer);
