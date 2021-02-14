import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCard = props => {
	const { store, actions } = useContext(Context);
	console.log(props.game);
	return (
		<Card className="bg-dark text-white">
			<Card.Img src={props.game.background_image} alt="Card image" />
			<Card.ImgOverlay>
				<Card.Title>{props.game.name}</Card.Title>
			</Card.ImgOverlay>
		</Card>
	);
};
GameCard.propTypes = {
	game: PropTypes.object
};
