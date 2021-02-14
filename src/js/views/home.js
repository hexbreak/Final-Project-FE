import React, { useState, useEffect, useContext } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { GameCarrousel } from "../component/gameCarrousel";
export const Home = () => {
	const { store, actions } = useContext(Context);
	actions.loadGameList(1);
	if (store.gameList != []) {
		return (
			<Carousel>
				{store.gameList.forEach((game, index) => {
					console.log(game);

					return <GameCarrousel game={game} key={index} />;
				})}
			</Carousel>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};
