import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Nav, Tab, Sonnet, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
import PropTypes from "prop-types";

export const UserFavorites = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const loadFavorites = () => {
			actions.getFavorites(store.id);
		};
		loadFavorites();
	}, []);
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
								<Nav.Link bg="light" variant="light" eventKey="all">
									<h4>All</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="new">
									<h4>New</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="progress">
									<h4>In Progress</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="finished">
									<h4>Finished</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="completed">
									<h4>Completed</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="favorites">
									<h4>Favorites</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="dropped">
									<h4>Dropped</h4>
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link bg="light" variant="light" eventKey="wishlist">
									<h4>Wishlist</h4>
								</Nav.Link>
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
												if (value.status == "favorites") {
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

UserFavorites.propTypes = {
	location: PropTypes.object
};
