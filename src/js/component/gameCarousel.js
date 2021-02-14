import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCarousel = () => {
	const { store, actions } = useContext(Context);
	return (
		<Carousel>
			{store.gameList.map((value, index) => {
				return (
					<Carousel.Item key={index}>
						<img className="d-block w-100" src={value.background_image} alt="First slide" />
						<Carousel.Caption>
							<h3>{value.name}</h3>
							{/* <p>{actions.loadGame(game.id).description}</p> */}
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
