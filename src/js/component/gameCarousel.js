import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCarousel = props => {
	const { store, actions } = useContext(Context);
	actions.loadGameListReversedRating(1);
	console.log(isHere);
	let isHere = 0;
	var promise = new Promise(function(resolve, reject) {
		if (store.gameListReversedRating != []) {
			resolve("The Info is Here");
		} else {
			reject(Error("It broke"));
		}
		promise.then((isHere = 1));
	});
	if (isHere == 1) {
		return (
			<Carousel>
				{store.gameListReversedRating.forEach(game => {
					<Carousel.Item>
						<img className="d-block w-100" src={game.background_image} alt="First slide" />
						<Carousel.Caption>
							<h3>{game.name}</h3>
							<p>{actions.loadGame(game.id).description}</p>
						</Carousel.Caption>
					</Carousel.Item>;
				})}
			</Carousel>
		);
	} else {
		return "null";
	}
};
