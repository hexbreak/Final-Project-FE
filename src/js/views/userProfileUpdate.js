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
	FormControl,
	ListGroup
} from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfileUpdate = props => {
	const { store, actions } = useContext(Context);
	const [platform1, setPlatform1] = useState(store.user.platforms[0]);
	const [platform2, setPlatform2] = useState(store.user.platforms[1]);
	const [platform3, setPlatform3] = useState(store.user.platforms[2]);
	const [playing1, setPlaying1] = useState(store.user.playing[0]);
	const [playing2, setPlaying2] = useState(store.user.playing[1]);
	const [playing3, setPlaying3] = useState(store.user.playing[2]);
	const [isShowing, setIsShowing] = useState("");
	const [gamesFound, setGamesFound] = useState("");
	const [tags, setTags] = useState([]);
	const [liked, setLiked] = useState(store.user.tags.liked);
	const [disliked, setDisliked] = useState(store.user.tags.disliked);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadPlatforms("50");
		};
		loadSearch();
	}, []);
	const handleLook = gameName => {
		setIsLooking(gameName);
		fetch(`https://api.rawg.io/api/games?search=${gameName}&page_size=6`)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				return setGamesFound(responseAsJson.results);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	};
	useEffect(() => {
		let sortedtags = [];
		const makeTags = () => {
			sortedtags = [];
			store.tags.forEach((value, index) => {
				disliked.forEach(disliked => {
					liked.forEach(liked => {
						if (value.id != disliked.id && value.id != liked.id) {
							if (!!value) {
								sortedtags.push({ id: value.id, name: value.name });
							}
						}
					});
				});
			});
		};
		makeTags();
		setTags(sortedtags);
	}, [store.tags]);
	const handleDisliked = tag => {
		let array = [...disliked, tag];
		setDisliked(array);

		array = tags.filter(value => {
			return value.id != tag.id;
		});
		setTags(array);
		console.log(tags);
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
									<Form.Control
										type="text"
										placeholder="About user..."
										defaultValue={store.user.about}
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
						<h5>Is now playing!</h5>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Row>
								<Dropdown>
									<Dropdown.Toggle
										variant="secondary"
										id="dropdown-basic"
										onClick={e => setIsShowing("1")}>
										{playing1.name}
									</Dropdown.Toggle>

									{isShowing == "1" && (
										<Dropdown.Menu>
											<Form.Control type="text" placeholder="About user..." />
											{/* {gamesFound != null &&
												gamesFound.map((value, index) => {
													return <Dropdown.Item key={index}>{value.name}</Dropdown.Item>;
												})} */}
										</Dropdown.Menu>
									)}
								</Dropdown>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={store.user.playing[0] != null ? store.user.playing[0].notes : ""}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Form.Control type="text" placeholder="Game name..." />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={!!store.user.playing[1] ? store.user.playing[1].notes : ""}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Form.Control
										type="text"
										placeholder="Game name..."
										defaultValue={store.user.playing[2] != null ? store.user.playing[2].name : null}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={
											store.user.playing[2] != null ? store.user.playing[2].notes : null
										}
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
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="dark" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Highlights</h5>
					</Card.Header>
					<Card.Body>
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
														defaultValue={
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
														defaultValue={
															store.user.game_progression[value.id].finished != null
																? store.user.game_progression[value.id].finished.name
																: null
														}
													/>
												</Form.Group>
												<Form.Group as={Col} controlId="formGridPassword">
													<Form.Label>Completed</Form.Label>
													<Form.Control
														type="text"
														placeholder="Game name..."
														defaultValue={
															store.user.game_progression[value.id].completed != null
																? store.user.game_progression[value.id].completed.name
																: null
														}
													/>
												</Form.Group>
											</Form.Row>
										</div>
									);
								})}
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Col>
					<Card bg="dark" style={{ width: "18rem", float: "left" }}>
						<Card.Header>Liked</Card.Header>
						<ListGroup variant="flush">
							{liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} variant="dark">
										{value.name}
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card bg="dark" style={{ width: "18rem", float: "left" }}>
						<Card.Header>Tags</Card.Header>
						<ListGroup variant="flush">
							{tags.map((value, index) => {
								return (
									<ListGroup.Item key={index} variant="dark">
										{value.name} <i className="fas fa-skull" onClick={e => handleDisliked(value)} />
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card bg="dark" style={{ width: "18rem", float: "left" }}>
						<Card.Header>Disliked</Card.Header>
						<ListGroup variant="flush">
							{disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} variant="dark">
										{value.name}
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
