import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserTags } from "../component/userTags";
import { Container, Row, Col, Card, CardImg, CardFooter, Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfileUpdate = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<Row>
				<Card bg="dark" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>User</h5>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Username</Form.Label>
									<Form.Control disabled type="email" placeholder={store.user.username} />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>New Password</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>About</Form.Label>
									<Form.Control type="text" placeholder="About user..." value={store.user.about} />
								</Form.Group>
							</Form.Row>
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="dark" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Is now playing!</h5>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Form.Control
										type="text"
										placeholder="Game name..."
										value={store.user.playing[0] != null ? store.user.playing[0].name : null}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										value={store.user.playing[0] != null ? store.user.playing[0].notes : null}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Form.Control
										type="text"
										placeholder="Game name..."
										value={store.user.playing[1] != null ? store.user.playing[1].name : null}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										value={store.user.playing[1] != null ? store.user.playing[1].notes : null}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Form.Control
										type="text"
										placeholder="Game name..."
										value={store.user.playing[2] != null ? store.user.playing[2].name : null}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										value={store.user.playing[2] != null ? store.user.playing[2].notes : null}
									/>
								</Form.Group>
							</Form.Row>
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="dark" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Platforms</h5>
					</Card.Header>
					<Card.Body>
						<Card.Text>
							<Form>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Plaftform 1</Form.Label>
										<Form.Control
											type="text"
											placeholder="Platform you own"
											value={
												store.user.platforms[0] != null ? store.user.platforms[0].name : null
											}
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Plaftform 2</Form.Label>
										<Form.Control
											type="text"
											placeholder="Platform you own"
											value={
												store.user.platforms[1] != null ? store.user.platforms[1].name : null
											}
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Plaftform 3</Form.Label>
										<Form.Control
											type="text"
											placeholder="Platform you own"
											value={
												store.user.platforms[2] != null ? store.user.platforms[2].name : null
											}
										/>
									</Form.Group>
								</Form.Row>
							</Form>
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="dark" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Highlights</h5>
					</Card.Header>
					<Card.Body>
						<Card.Text>
							<Form>
								{store.user.platforms != null &&
									store.user.platforms.map((value, index) => {
										return (
											<div key={index}>
												<h6>{value.name}</h6>
												<Form.Row>
													<Form.Group as={Col} controlId="formGridEmail">
														<Form.Label>Started</Form.Label>
														<Form.Control
															type="text"
															placeholder="Game name..."
															value={
																store.user.game_progression[value.id].started != null
																	? store.user.game_progression[value.id].started.name
																	: null
															}
														/>
													</Form.Group>
													<Form.Group as={Col} controlId="formGridPassword">
														<Form.Label>Finished</Form.Label>
														<Form.Control
															type="text"
															placeholder="Game name..."
															value={
																store.user.game_progression[value.id].finished != null
																	? store.user.game_progression[value.id].finished
																			.name
																	: null
															}
														/>
													</Form.Group>
													<Form.Group as={Col} controlId="formGridPassword">
														<Form.Label>Completed</Form.Label>
														<Form.Control
															type="text"
															placeholder="Game name..."
															value={
																store.user.game_progression[value.id].completed != null
																	? store.user.game_progression[value.id].completed
																			.name
																	: null
															}
														/>
													</Form.Group>
												</Form.Row>
											</div>
										);
									})}
							</Form>
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};
