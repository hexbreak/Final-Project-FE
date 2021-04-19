import React, { useState, useEffect, useContext } from "react";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.scss";
import { GameCarousel } from "../component/gameCarousel";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
export const Home = () => {
	const { store, actions } = useContext(Context);
	const [sortKey, setSort] = useState("name");
	const [inverted, setInverted] = useState(false);
	const [pagination, setPagination] = useState(1);
	let history = useHistory();
	const handleViewMore = viewMore => {
		viewMore;
		window.scrollTo(0, 0);
	};
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
				<>
					<div className="header">
						<p id="banner-font">A place to find games you love...</p>
					</div>
					<Container fluid style={{ marginTop: " -1.5rem" }}>
						<Row style={{ marginTop: "45px" }}>
							<Col className="row justify-content-md-center">
								<GameCarousel />
							</Col>
						</Row>
						<Container fluid className="white">
							<Row style={{ marginTop: "13rem" }} className="spacing">
								<Col style={{ marginTop: "2rem" }} className="center">
									<h2 className="subtitle center">Sortable Games</h2>
									<div className="center content">
										<Sorter
											setSort={setSort}
											sortKey={sortKey}
											setInverted={setInverted}
											inverted={inverted}
											setPagination={setPagination}
										/>
									</div>
									<Row className="scroller fit center" style={{ marginTop: "1rem" }}>
										{store.sortedGameList.map((value, index) => {
											return (
												<GameCard className="card" key={index} size={"bigCard"} game={value} />
											);
										})}
									</Row>
									<Row className="center search-margin">
										{pagination > 1 && (
											<Button
												className="center"
												variant="success"
												onClick={e => setPagination(pagination - 1)}>
												Previous Page
											</Button>
										)}
										<Button
											className="center"
											variant="success"
											onClick={e =>
												handleViewMore(
													history.push({
														pathname: "/search",
														state: {
															sort: sortKey,
															pagination: pagination,
															inverted: inverted
														}
													})
												)
											}>
											View More
										</Button>
										<Button
											className="center"
											variant="success"
											onClick={e => setPagination(pagination + 1)}>
											Next Page
										</Button>
									</Row>
								</Col>
							</Row>
							<Row className="spacing">
								<Col>
									<h2 className="subtitle center">Metacritic Rating</h2>
									<Row className="scroller fit center content">
										{store.gameMetacriticList.map((value, index) => {
											return (
												<GameCard className="card" key={index} game={value} size={"bigCard"} />
											);
										})}
									</Row>
									<Row className="center search-margin">
										<Button
											className="center"
											variant="success"
											onClick={e =>
												handleViewMore(
													history.push({ pathname: "/search", state: { sort: "metacritic" } })
												)
											}>
											View More
										</Button>
									</Row>
								</Col>
							</Row>
							<Row className="space" style={{ marginTop: "10rem" }}>
								<Col>
									<h2 className="subtitle center">User Rating</h2>
									<Row className="scroller fit center" style={{ marginTop: "3rem" }}>
										{store.gameRatingList.map((value, index) => {
											return (
												<GameCard className="card" key={index} game={value} size={"bigCard"} />
											);
										})}
									</Row>
									<Row className="center">
										<Button
											className="center search-margin"
											variant="success"
											onClick={e =>
												handleViewMore(
													history.push({ pathname: "/search", state: { sort: "rating" } })
												)
											}>
											View More
										</Button>
									</Row>
								</Col>
							</Row>
						</Container>
					</Container>
				</>
			);
		} else {
			return <h1>Loading...</h1>;
		}
	} else {
		return <h1>Loading...</h1>;
	}
};
