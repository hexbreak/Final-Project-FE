import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { Game } from "../component/game";
import { Footer } from "../component/footer";

export const Home = () => {
	const { store, actions } = useContext(Context);
	actions.loadGameList(1);

	console.log(store.gameList);
	return (
		<div className="container-fluid">
			<div className="jumbotron">
				<img src={store.loadGameList[0].background_image} alt="game_image" />
				<h1>{store.loadGameList[0].name}</h1>
				<h6>{actions.loadGame(store.loadGameList[0].id).description}</h6>
			</div>
		</div>
	);
};
