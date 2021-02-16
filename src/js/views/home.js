import React, { useState, useEffect, useContext } from "react";
import { Carousel, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { GameCarousel } from "../component/gameCarousel";
import { GameCard } from "../component/gameCard";
export const Home = () => {
	const { store, actions } = useContext(Context);
	actions.loadGameList(1);
	if (store.gameList[0] != undefined) {
		if (store.gameList[0].name != undefined) {
			return (
				<Container fluid>
					<Row>
						<GameCarousel />
					</Row>
					<Row />
					<Row>
						<div>
							<h1> Games </h1>
							<div className="scroller">
								{store.gameList.map((value, index) => {
									return <GameCard className="card" key={index} game={value} />;
								})}
							</div>
						</div>
					</Row>
				</Container>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	} else {
		return <h1>Loading...</h1>;
	}
};
