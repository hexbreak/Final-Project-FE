import React, { useState, useEffect, useContext } from "react";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { GameCarousel } from "../component/gameCarousel";
import { GameCard } from "../component/gameCard";
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
						<Col>
							<GameCarousel />
						</Col>
					</Row>
					<Row />
					<Row>
						<Col>
							<h1> Games </h1>
						</Col>
						<Col>
							<Button
								variant="primary"
								onClick={inverted == false ? e => setInverted(true) : e => setInverted(false)}>
								{inverted == false ? (
									<i className="fas fa-sort-up"></i>
								) : (
									<i className="fas fa-sort-down"></i>
								)}
							</Button>
						</Col>
						<Col>
							<DropdownButton variant="dark" title={sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}>
								<Dropdown.Item variant="dark" onClick={e => setSort("name")}>
									Name
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("released")}>
									Released
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("added")}>
									Added
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("created")}>
									Created
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("updated")}>
									Updated
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("rating")}>
									Rating
								</Dropdown.Item>
								<Dropdown.Item variant="dark" onClick={e => setSort("metacritic")}>
									Metacritic
								</Dropdown.Item>
							</DropdownButton>
						</Col>
					</Row>
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
					<Row>
						<Col>
							<h1>User Rating</h1>
							<div className="scroller">
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
