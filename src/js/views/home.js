import React, { useState, useEffect, useContext } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
<<<<<<< HEAD
import { Game } from "../component/game";
import { GameCarousel } from "../component/gameCarousel";
=======
import { GameCarrousel } from "../component/gameCarrousel";
>>>>>>> 8babdbfb20a9908b1c3f924a472392aafe19ca71
export const Home = () => {
	const { store, actions } = useContext(Context);
	actions.loadGameList(1);
	if (store.gameList != []) {
		return <GameCarousel />;
	} else {
		return <h1>Loading...</h1>;
	}
};
