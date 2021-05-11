import React, { useEffect, useContext } from "react";
import { Card, Container, Row, Col, Nav, Tab, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const UserGames = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const loadUserGames = () => {
			actions.getUserGames(store.id);
		};
		loadUserGames();
	}, [store.id]);
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
	const renderPlaying = props => (
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
			className="space center pt-3">
			<Row className="detailspace">
				<Col>
					<h2 className="subtitle">My Games</h2>
				</Col>
			</Row>
			<Row className="detailspace">
				<Tab.Container defaultActiveKey="all">
					<Row className="detailspace" style={{ width: "100%" }}>
						<Nav variant="pills" className="flex-column center" style={{ width: "100%" }}>
							<Row className="justify-content-center">
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderAll}>
											<Nav.Link bg="light" variant="light" eventKey="all">
												<Row>
													<h1 className="user-games-navpills center">All</h1>
												</Row>
												<Row>
													<i className="fas fa-gamepad center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderNew}>
											<Nav.Link bg="light" variant="light" eventKey="new">
												<Row>
													<h1 className="user-games-navpills center">New</h1>
												</Row>
												<Row>
													<i className="fas fa-star center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderPlaying}>
											<Nav.Link bg="light" variant="light" eventKey="playing">
												<Row>
													<h1 className="user-games-navpills center">Playing</h1>
												</Row>
												<Row>
													<i className="fas fa-wrench center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderFinished}>
											<Nav.Link bg="light" variant="light" eventKey="finished">
												<Row>
													<h1 className="user-games-navpills center">Finished</h1>
												</Row>
												<Row>
													<i className="fas fa-check-square center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderCompleted}>
											<Nav.Link bg="light" variant="light" eventKey="completed">
												<Row>
													<h1 className="user-games-navpills center">Completed</h1>
												</Row>
												<Row>
													<i className="fas fa-trophy center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderFavorite}>
											<Nav.Link bg="light" variant="light" eventKey="favorites">
												<Row>
													<h1 className="user-games-navpills center">Favorites</h1>
												</Row>
												<Row>
													<i className="fas fa-heart center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderDropped}>
											<Nav.Link bg="light" variant="light" eventKey="dropped">
												<Row>
													<h1 className="user-games-navpills center">Dropped</h1>
												</Row>
												<Row>
													<i className="fas fa-thumbs-down center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
								<Col className="col-5" md={1}>
									<Nav.Item>
										<OverlayTrigger
											placement="top"
											delay={{ show: 250, hide: 400 }}
											overlay={renderWishlist}>
											<Nav.Link bg="light" variant="light" eventKey="wishlist">
												<Row>
													<h1 className="user-games-navpills center">Wishlist</h1>
												</Row>
												<Row>
													<i className="fas fa-hand-holding-usd center" />
												</Row>
											</Nav.Link>
										</OverlayTrigger>
									</Nav.Item>
								</Col>
							</Row>
						</Nav>
					</Row>
					<Row className="detailspace">
						<Tab.Content className="space">
							<Tab.Pane eventKey="all">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														let game = {
															id: value.game_id,
															name: value.game_name,
															background_image: value.game_image
														};
														return (
															<Col className="col-12" md={3} key={index}>
																<GameCard
																	id={"user-games-card"}
																	className="card"
																	size={"mediumCard"}
																	game={game}
																/>
															</Col>
														);
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="new">
								<Row className="search-margin ">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "new") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="playing">
								<Row className="search-margin ">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "playing") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="finished">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "finished") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="completed">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "completed") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="favorites">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "favorite") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="dropped">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "dropped") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
							<Tab.Pane eventKey="wishlist">
								<Row className="search-margin">
									<Col>
										<Container fluid className="search-box">
											<Row className="search-margin">
												{store.user_games.length > 0 &&
													store.user_games.map((value, index) => {
														if (value.game_status == "wishlist") {
															let game = {
																id: value.game_id,
																name: value.game_name,
																background_image: value.game_image
															};
															return (
																<Col className="col-12" md={3} key={index}>
																	<GameCard
																		id={"user-games-card"}
																		className="card"
																		size={"mediumCard"}
																		game={game}
																	/>
																</Col>
															);
														}
													})}
											</Row>
										</Container>
									</Col>
								</Row>
							</Tab.Pane>
						</Tab.Content>
					</Row>
				</Tab.Container>
			</Row>
		</Container>
	);
};

UserGames.propTypes = {
	location: PropTypes.object
};
