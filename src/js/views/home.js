import React, { useState, useEffect, useContext } from "react";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { GameCarousel } from "../component/gameCarousel";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
export const Home = () => {
	const { store, actions } = useContext(Context);
	const [sortKey, setSort] = useState("name");
	const [inverted, setInverted] = useState(true);
	const [pagination, setPagination] = useState(1);
	useEffect(() => {
		actions.loadGameList(1);
		actions.loadLists(1);
	}, []);
	useEffect(() => {
		let sort = "";
		if (inverted == true) {
			sort = `-${sortKey}`;
		} else {
			sort = sortKey;
		}
		actions.loadSortedGameList(pagination, sort);
	}, [sortKey, pagination, inverted]);
	if (store.sortedGameList[0] != undefined) {
		if (store.sortedGameList[0].name != undefined) {
			return (
				<Container fluid>
					<Row>
						<Col className="row justify-content-md-center">
							<GameCarousel />
						</Col>
					</Row>
					<br />
					<br />
					<br />
					<br />
					<Row>
						<Col className="row justify-content-md-center">
							<Sorter setSort={setSort} sortKey={sortKey} setInverted={setInverted} inverted={inverted} />
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<h1>Sortable Games</h1>
							<div className="scroller">
								{store.sortedGameList.map((value, index) => {
									return <GameCard className="card" key={index} game={value} />;
								})}
							</div>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<h1>Metacritic Rating</h1>
							<div className="scroller">
								{store.gameMetacriticList.map((value, index) => {
									return <GameCard className="card" key={index} game={value} />;
								})}
							</div>
						</Col>
					</Row>
					<br />
					<Row>
						<Col>
							<h1>User Rating</h1>
							<div style={{ marginBottom: "5rem" }} className="scroller">
								{store.gameRatingList.map((value, index) => {
									return <GameCard className="card" key={index} game={value} />;
								})}
							</div>
						</Col>
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
