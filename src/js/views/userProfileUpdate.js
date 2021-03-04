import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserTags } from "../component/userTags";
import {
	Container,
	Row,
	Col,
	Card,
	CardImg,
	CardFooter,
	Form,
	Dropdown,
	DropdownButton,
	FormControl
} from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfileUpdate = props => {
	const { store, actions } = useContext(Context);
	const [platform1, setPlatform1] = useState(store.user.platforms[0]);
	const [platform2, setPlatform2] = useState(store.user.platforms[1]);
	const [platform3, setPlatform3] = useState(store.user.platforms[2]);
	const [isNowPlaying1, setIsNowPlaying1] = useState(store.user.playing[0]);
	const [isNowPlaying2, setIsNowPlaying2] = useState(store.user.playing[1]);
	const [isNowPlaying3, setIsNowPlaying3] = useState(store.user.playing[2]);
	const [isNowLooking1, setIsNowLooking1] = useState("");
	const [isNowLooking2, setIsNowLooking2] = useState("");
	const [isNowLooking3, setIsNowLooking3] = useState("");
	var gamesFound1 = null;
	var gamesFound2 = null;
	var gamesFound3 = null;
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadPlatforms("50");
		};
		loadSearch();
	}, []);
	const handleLook1 = gameName => {
		setIsNowLooking1(gameName);
		return (gamesFound1 = actions.looking(gameName));
	};
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
								<Dropdown>
									<Dropdown.Toggle variant="secondary" id="dropdown-basic">
										{isNowPlaying1.name}
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item></Dropdown.Item>
										{gamesFound1 != null &&
											gamesFound1.map((value, index) => {
												return <Dropdown.Item key={index}>{Action}</Dropdown.Item>;
											})}
									</Dropdown.Menu>
								</Dropdown>

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
										value={isNowPlaying2.name != undefined ? isNowPlaying2.name : null}
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
										<DropdownButton
											id="dropdown-basic-button"
											variant="secondary"
											title={platform1.name}>
											{store.platforms[0] != undefined &&
												store.platforms.map((value, index) => {
													if (
														value.name != platform1.name &&
														value.name != platform2.name &&
														value.name != platform3.name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	setPlatform1({ id: value.id, name: value.name })
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</DropdownButton>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Plaftform 2</Form.Label>
										<DropdownButton
											id="dropdown-basic-button"
											variant="secondary"
											title={platform2.name}>
											{store.platforms[0] != undefined &&
												store.platforms.map((value, index) => {
													if (
														value.name != platform1.name &&
														value.name != platform2.name &&
														value.name != platform3.name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	setPlatform2({ id: value.id, name: value.name })
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</DropdownButton>
									</Form.Group>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Plaftform 3</Form.Label>
										<DropdownButton
											id="dropdown-basic-button"
											variant="secondary"
											title={platform3.name}>
											{store.platforms[0] != undefined &&
												store.platforms.map((value, index) => {
													if (
														value.name != platform1.name &&
														value.name != platform2.name &&
														value.name != platform3.name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	setPlatform3({ id: value.id, name: value.name })
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</DropdownButton>
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
