import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const GameDetails = props => {
	const { store, actions } = useContext(Context);
	actions.loadDlcs(props.location.state);
	actions.loadOtherGames(props.location.state);
	actions.loadGame(props.location.state);

	if (store.game.name != undefined) {
		return (
			<Container>
				<Jumbotron fluid className="text-dark">
					<Container>
						<div>
							<img src={store.game.background_image} alt="First slide" />
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
													{store.game.platforms.map((value, index) => {
														return ` ${value.platform.name}`;
													})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Genres</h1>
													{store.game.genres.map((value, index) => {
														return ` ${value.name}`;
													})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Release Date</h1>
													{store.game.released}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<div>
													<h1>Developers</h1>
													{store.game.developers.map((value, index) => {
														return ` ${value.name}`;
													})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Publishers</h1>
													{store.game.publishers.map((value, index) => {
														return ` ${value.name}`;
													})}
												</div>
											</Col>
											<Col>
												<div>
													<h1>Age Ranting</h1>
													{store.game.esrb_rating.name}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1> Downloable Content </h1>
												<div className="scroller">
													{store.dlcsList.map((value, index) => {
														return <GameCard className="card" key={index} game={value} />;
													})}
												</div>
											</Col>
										</Row>
										<Row>
											<Col>
												<h1> Game Series </h1>
												<div className="scroller">
													{store.otherGamesList.map((value, index) => {
														return <GameCard className="card" key={index} game={value} />;
													})}
												</div>
											</Col>
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
