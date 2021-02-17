import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const GameDetails = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const loadGame = () => {
			actions.loadDlcs(props.location.state);
			actions.loadOtherGames(props.location.state);
			actions.loadGame(props.location.state);
		};
		loadGame();
	}, [props.location.state]);
	useEffect(() => {
		if (store.game.id == props.location.state) {
			const genreId = store.game.genres.map((value, index) => {
				return value.id;
			});
			actions.loadSimilarGames(genreId);
		}
	}, [store.game]);
	if (store.game.id == props.location.state) {
		return (
			<Container fluid>
				<Jumbotron className="text-dark">
					<Container>
						<div>
							<img
								src={
									store.game.background_image != null
										? store.game.background_image
										: "https://cdn.pixabay.com/photo/2020/12/14/15/48/light-bulb-5831252_960_720.jpg"
								}
								alt="First slide"
							/>
						</div>
						<h1>{store.game.name}</h1>
						<p>{store.game.description_raw}</p>
					</Container>
				</Jumbotron>
				<Row>
					<Tab.Container defaultActiveKey="details">
						<Row>
							<Nav variant="pills" className="flex-column">
								<Row>
									<Nav.Item>
										<Nav.Link eventKey="details">Details</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="statistics">Statistic</Nav.Link>
									</Nav.Item>
								</Row>
							</Nav>
						</Row>
						<Row>
							<Col>
								<Tab.Content>
									<Tab.Pane eventKey="details">
										<Row>
											<Col>
												<div>
													<h1>Platforms</h1>
													{store.game.platforms != null &&
														store.game.platforms.map(value => {
															return ` ${value.platform.name}`;
														})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Genres</h1>
													{store.game.genres != null &&
														store.game.genres.map(value => {
															return ` ${value.name}`;
														})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Release Date</h1>
													{store.game.released != null && store.game.released}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<div>
													<h1>Developers</h1>
													{store.game.developers != null &&
														store.game.developers.map(value => {
															return ` ${value.name}`;
														})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Publishers</h1>
													{Array.isArray(store.game.publishers) &&
														store.game.publishers.length > 0 &&
														store.game.publishers.map(value => {
															return ` ${value.name}`;
														})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Age Ranting</h1>
													{store.game.esrb_rating != null && store.game.esrb_rating.name}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1> Downloable Content </h1>
												<div className="scroller">
													{store.dlcsList != null &&
														store.dlcsList.map((value, index) => {
															return (
																<GameCard className="card" key={index} game={value} />
															);
														})}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1> Game Series </h1>
												<div className="scroller">
													{store.otherGamesList != null &&
														store.otherGamesList.map((value, index) => {
															return (
																<GameCard className="card" key={index} game={value} />
															);
														})}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1>Website</h1>
												<a className="fab fa-reddit" href={store.game.reddit_url} />
												<a
													className="fas fa-window-restore"
													href={store.game.website != null ? store.game.website : null}
												/>
											</Col>
											<Col>
												<h1>Tags</h1>
												{store.game.tags != null &&
													store.game.tags.map(value => {
														return ` ${value.name}`;
													})}
											</Col>
										</Row>
										<Row>
											<h1>PC Requirements</h1>
										</Row>
										<Row>
											{store.game.platforms != null &&
												store.game.platforms.map(value => {
													if (value.platform.id == 4 && value.requirements != undefined) {
														if (
															Object.keys(value.requirements).length === 0 &&
															value.requirements.constructor === Object
														) {
															return null;
														} else {
															return Object.values(value.requirements);
														}
													} else {
														return null;
													}
												})}
										</Row>
										<Row>
											<h1>Similar Games</h1>
											<div className="scroller">
												{store.similarGamesList.map((value, index) => {
													return <GameCard className="card" key={index} game={value} />;
												})}
											</div>
										</Row>
									</Tab.Pane>
									<Tab.Pane eventKey="statistics">Lets go statistics</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</Row>
			</Container>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};

GameDetails.propTypes = {
	location: PropTypes.object
};
