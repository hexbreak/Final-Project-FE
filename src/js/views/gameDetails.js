import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet, Button } from "react-bootstrap";
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
			actions.loadGameAchievements(props.location.state);
			actions.loadGameTrailers(props.location.state);
		};
		loadGame();
	}, [props.location.state]);
	useEffect(() => {
		if (store.game.id == props.location.state) {
			const genreId = store.game.genres.map((value, index) => {
				return value.id;
			});
			actions.loadSimilarGames(genreId);
			actions.loadAddedByPlayers(store.game.added_by_status);
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
				<Tab.Container defaultActiveKey="details">
					<Nav variant="pills" bg="dark" className="flex-column">
						<Row>
							<Nav.Item>
								<Nav.Link eventKey="details">Details</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="statistics">Statistic</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="store">Store</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="media">Media</Nav.Link>
							</Nav.Item>
							<Button onClick={() => actions.addtoFavorites()}>Add to Favorites</Button>
						</Row>
					</Nav>
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
									<h1> Downloadable Content </h1>
									<div className="scroller">
										{store.dlcsList != null &&
											store.dlcsList.map((value, index) => {
												return <GameCard className="card" key={index} game={value} />;
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
												return <GameCard className="card" key={index} game={value} />;
											})}
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<h1>Website</h1>
									{store.game.reddit_url != "" && (
										<a
											className="fab fa-reddit"
											href={store.game.reddit_url}
											target="_blank"
											rel="noreferrer"
										/>
									)}
									{store.game.website != "" && (
										<a
											target="_blank"
											rel="noreferrer"
											className="fas fa-window-restore"
											href={store.game.website}
										/>
									)}
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
						<Tab.Pane eventKey="statistics">
							<Row>
								<Col>
									<h1>Rating</h1>
									{store.game.rating}
								</Col>
							</Row>
							<Row>
								<Col>
									<h1>Metascore</h1>
									{store.game.metacritic != null && store.game.metacritic}
								</Col>
								<Col>
									<h1>Rating Count</h1>
									{store.game.ratings_count}
								</Col>
								<Col>
									<h1>Added on Players</h1>
									{store.game.added}
								</Col>
							</Row>
							<Row>
								<Col>
									<h1>Players Status</h1>
									{store.addedByPlayers.map(value => {
										return ` ${value}`;
									})}
								</Col>
								<Col>
									<h1>People on Favorites</h1>
									{}
								</Col>
							</Row>
							<Row>
								<Col>
									<h1>Achivements</h1>
									{store.gameAchievements != null &&
										store.gameAchievements.map((value, index) => {
											return (
												<Col key={index}>
													<h1>{value.name}</h1>
													<p>{value.description}</p>
													<img src={value.image} alt="achievemnt" />
													<h6>%{value.percent}</h6>
												</Col>
											);
										})}
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="store">
							<Row>
								<Col>
									<h1>Stores</h1>
									<div>
										{store.game.stores.map((value, index) => {
											if (value.store.id == 11 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://d3bzyjrsc4233l.cloudfront.net/company_office/epicgames_logo.png"
															alt="epic store"
														/>
													</a>
												);
											} else if (value.store.id == 3 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://cdn4.iconfinder.com/data/icons/liu-square-blac/60/playstation-square-social-media-128.png"
															alt="psn"
														/>
													</a>
												);
											} else if (value.store.id == 2 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/387_Xbox_logo-512.png"
															alt="xbox store"
														/>
													</a>
												);
											} else if (value.store.id == 4 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://i.pinimg.com/originals/8e/14/6e/8e146e9e28baeb9b59c6004ed7b1343b.png"
															alt="app store"
														/>
													</a>
												);
											} else if (value.store.id == 5 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://cdn.iconscout.com/icon/free/png-512/gog-galaxy-555193.png"
															alt="gog"
														/>
													</a>
												);
											} else if (value.store.id == 6 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://media.pocketgamer.com/artwork/na-hois/eshop-logo.png"
															alt="nintendo"
														/>
													</a>
												);
											} else if (value.store.id == 7 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://www.freepnglogos.com/uploads/xbox-one-png-23.png"
															alt="xbox 360"
														/>
													</a>
												);
											} else if (value.store.id == 8 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/152_Google_Play-512.png"
															alt="google play"
														/>
													</a>
												);
											} else if (value.store.id == 9 && value.store.url != "") {
												return (
													<a href={value.url} key={index} arget="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://img.icons8.com/windows/452/itch-io.png"
															alt="itch io"
														/>
													</a>
												);
											} else if (value.store.id == 1 && value.store.url != "") {
												return (
													<a href={value.url} key={index} target="_blank" rel="noreferrer">
														<img
															className="store"
															src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
															alt="steam"
														/>
													</a>
												);
											}
										})}
									</div>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="media">
							<Row>
								<Col>
									<h1>Media</h1>
									{store.gameTrailers != null &&
										store.gameTrailers.map((value, index) => {
											return (
												<div key={index}>
													<h3>{value.name}</h3>
													<video width="400" poster={value.preview} controls>
														<source src={value.data.max} type="video/mp4" />
														Your browser does not support HTML video.
													</video>
												</div>
											);
										})}
									{store.game.clip != null && (
										<div>
											<h3>Gameplay</h3>
											<video width="400" controls>
												<source src={store.game.clip.clip} type="video/mp4" />
												Your browser does not support HTML video.
											</video>
										</div>
									)}
								</Col>
							</Row>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Container>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};

GameDetails.propTypes = {
	location: PropTypes.object
};
