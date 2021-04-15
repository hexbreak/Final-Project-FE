import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Nav, Tab, Sonnet, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const UserGames = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const loadUserGames = () => {
			actions.getUserGames(store.user.id);
		};
		loadUserGames();
	}, []);
	const renderAll = props => (
		<Tooltip id="button-tooltip" {...props}>
			All games!
		</Tooltip>
	);
	const renderNew = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you just got!
		</Tooltip>
	);
	const renderProgress = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you&apos;re playing still!
		</Tooltip>
	);
	const renderFinished = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you finished!
		</Tooltip>
	);
	const renderCompleted = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you completed all its content!
		</Tooltip>
	);
	const renderFavorite = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you really love!
		</Tooltip>
	);
	const renderDropped = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that didn&apos;t fit your taste!
		</Tooltip>
	);
	const renderWishlist = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you want to play!
		</Tooltip>
	);
	return (
		<Container
			fluid
			style={{
				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
				paddingBottom: "3rem"
			}}
			className="space center">
			<Row>
				<Col>
					<span>My Games</span>
				</Col>
			</Row>
			<Row>
				<Tab.Container defaultActiveKey="all">
					<Nav variant="pills" style={{ height: "3rem" }} className="flex-column">
						<Row>
							<Nav.Item>
								<OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderAll}>
									<Nav.Link bg="light" variant="light" eventKey="all">
										<Row>
											<h4>All</h4>
										</Row>
										<Row>
											<i className="fas fa-gamepad" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderNew}>
									<Nav.Link bg="light" variant="light" eventKey="new">
										<Row>
											<h4>New</h4>
										</Row>
										<Row>&#9733;</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderProgress}>
									<Nav.Link bg="light" variant="light" eventKey="progress">
										<Row>
											<h4>In progress</h4>
										</Row>
										<Row>
											<i className="fas fa-wrench" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderFinished}>
									<Nav.Link bg="light" variant="light" eventKey="finished">
										<Row>
											<h4>Finished</h4>
										</Row>
										<Row>
											<i className="fas fa-check-square" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderCompleted}>
									<Nav.Link bg="light" variant="light" eventKey="completed">
										<Row>
											<h4>Completed</h4>
										</Row>
										<Row>
											<i className="fas fa-trophy" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderFavorite}>
									<Nav.Link bg="light" variant="light" eventKey="favorites">
										<Row>
											<h4>Favorites</h4>
										</Row>
										<Row>
											<i className="fas fa-heart" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderDropped}>
									<Nav.Link bg="light" variant="light" eventKey="dropped">
										<Row>
											<h4>Dropped</h4>
										</Row>
										<Row>
											<i className="fas fa-thumbs-down" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
							<Nav.Item>
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={renderWishlist}>
									<Nav.Link bg="light" variant="light" eventKey="wishlist">
										<Row>
											<h4>Wishlist</h4>
										</Row>
										<Row>
											<i className="fas fa-hand-holding-usd" />
										</Row>
									</Nav.Link>
								</OverlayTrigger>
							</Nav.Item>
						</Row>
					</Nav>
					<Tab.Content className="space">
						<Tab.Pane eventKey="all">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												let game = {
													id: value.game_id,
													name: value.game_name,
													background_image: value.game_image
												};
												return <GameCard className="card" key={index} game={game} />;
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="new">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "new") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="progress">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "progress") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="finished">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "finished") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="completed">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "completed") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="favorites">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "favorite") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="dropped">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "dropped") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
						<Tab.Pane eventKey="wishlist">
							<Row className="search-margin center">
								<Col className="center search-margin search-box" sm={11}>
									<Row className="search-margin">
										{store.user_games.length > 0 &&
											store.user_games.map((value, index) => {
												if (value.status == "wishlist") {
													let game = {
														id: value.game_id,
														name: value.game_name,
														background_image: value.game_image
													};
													return <GameCard className="card" key={index} game={game} />;
												}
											})}
									</Row>
								</Col>
							</Row>
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Row>
		</Container>
	);
};

UserGames.propTypes = {
	location: PropTypes.object
};
