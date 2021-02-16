import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCard = props => {
	const { store, actions } = useContext(Context);
	return (
		<Link to={{ pathname: `/details/${props.game.id}`, state: props.game.id }}>
			<Card className="bg-dark text-white">
				<Card.Img src={props.game.background_image} alt="Card image" />
				<Card.ImgOverlay>
					<Card.Title>{props.game.name}</Card.Title>
				</Card.ImgOverlay>
			</Card>
		</Link>
	);
};
GameCard.propTypes = {
	game: PropTypes.object
};
