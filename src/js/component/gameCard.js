import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCard = props => {
	const { store, actions } = useContext(Context);
	const makeBorders = () => {
		let cardBorder = null;
		props.game.tags.forEach(value => {
			store.user.tags.liked.forEach(tags => {
				if (value.id == tags.id && cardBorder != null) {
					cardBorder = "warning";
				} else if (value.id == tags.id) {
					cardBorder = "success";
				}
			});
			store.user.tags.disliked.forEach(tags => {
				if (value.id == tags.id && cardBorder != null) {
					cardBorder = "warning";
				} else if (value.id == tags.id) {
					cardBorder = "danger";
				}
			});
		});
		return cardBorder;
	};
	return (
		<Link to={{ pathname: `/details/${props.game.id}`, state: props.game.id }}>
			<Card
				style={{ marginBottom: "1rem" }}
				className="bg-dark rounded-3 mr-3 ml-3 text-white"
				border={store.user.preference == true && makeBorders()}>
				<Card.Img
					className="card-img"
					src={
						props.game.background_image != null
							? props.game.background_image
							: "https://cdn.pixabay.com/photo/2020/12/14/15/48/light-bulb-5831252_960_720.jpg"
					}
					alt="Card Image"
				/>
				<Card.ImgOverlay>
					<Card.Title id="logo">{props.game.name}</Card.Title>
				</Card.ImgOverlay>
			</Card>
		</Link>
	);
};
GameCard.propTypes = {
	game: PropTypes.object
};
