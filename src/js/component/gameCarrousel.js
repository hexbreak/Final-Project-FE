import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCarrousel = props => {
	const { store, actions } = useContext(Context);
	return (
		<Carousel.Item>
			<img className="d-block w-100" src={props.game.background_image} alt="First slide" />
			<Carousel.Caption>
				<h3>{props.game.name}</h3>
				<p>{actions.loadGame(props.game.id).description}</p>
			</Carousel.Caption>
		</Carousel.Item>
	);
};
GameCarrousel.propTypes = {
	game: PropTypes.object
};
