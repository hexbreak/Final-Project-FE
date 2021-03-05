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
	ListGroup,
	Button
} from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfileUpdate = props => {
	const { store, actions } = useContext(Context);
	const [about, setAbout] = useState(store.user.about);
	const [platform1, setPlatform1] = useState(store.user.platforms[0]);
	const [platform2, setPlatform2] = useState(store.user.platforms[1]);
	const [platform3, setPlatform3] = useState(store.user.platforms[2]);
	const [platforms, setPlatforms] = useState({ platform1, platform2, platform3 });
	const [playing1, setPlaying1] = useState(store.user.playing[0]);
	const [playing2, setPlaying2] = useState(store.user.playing[1]);
	const [playing3, setPlaying3] = useState(store.user.playing[2]);
	const [gamesFound, setGamesFound] = useState("");
	const [isLooking, setIsLooking] = useState("");
	const [tags, setTags] = useState([]);
	const [liked, setLiked] = useState(store.user.tags.liked);
	const [disliked, setDisliked] = useState(store.user.tags.disliked);
	useEffect(() => {
		setPlatforms({ platform1, platform2, platform3 });
	}, [platform1, platform2, platform3]);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadPlatforms("50");
		};
		loadSearch();
	}, []);
	const sort = array => {
		array.sort(function(a, b) {
			var nameA = a.name.toUpperCase();
			var nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
		return array;
	};
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
	const handleSave = () => {
		var user = {
			...store.user,
			password: store.user.password,
			about: about,
			image: store.user.image,
			platforms: [platform1, platform2, platform3],
			playing: [playing1, playing2, playing3],
			tags: { liked: liked, disliked: disliked }
		};
		actions.handleSave(user);
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
		sortedtags = sort(sortedtags);
		setTags(sortedtags);
	}, [store.tags]);
	const handleDisliked = tag => {
		let array = [...disliked, tag];
		array = sort(array);
		setDisliked(array);
		array = tags.filter(value => {
			return value.id != tag.id;
		});
		array = sort(array);
		setTags(array);
	};
	const handleLiked = tag => {
		let array = [...liked, tag];
		array = sort(array);
		setLiked(array);
		array = tags.filter(value => {
			return value.id != tag.id;
		});
		array = sort(array);
		setTags(array);
	};
	const handleMiddleL = tag => {
		let array = [...tags, tag];
		array = sort(array);
		setTags(array);
		array = liked.filter(value => {
			return value.id != tag.id;
		});
		array = sort(array);
		setLiked(array);
	};
	const handleMiddleD = tag => {
		let array = [...tags, tag];
		array = sort(array);
		setTags(array);
		array = disliked.filter(value => {
			return value.id != tag.id;
		});
		array = sort(array);
		setDisliked(array);
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
										defaultValue={about}
										onChange={e => setAbout(e.target.value)}
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
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing1 ? playing1.name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlaying1({
																	...playing1,
																	name: value.name,
																	id: value.id
																})
															}>
															{value.name}
														</Dropdown.Item>
													);
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={playing1 != null ? playing1.notes : ""}
										onChange={e => setPlaying1({ ...playing1, notes: e.target.value })}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing2 ? playing2.name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlaying2({
																	...playing2,
																	name: value.name,
																	id: value.id
																})
															}>
															{value.name}
														</Dropdown.Item>
													);
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={playing2 != null ? playing2.notes : ""}
										onChange={e => setPlaying2({ ...playing2, notes: e.target.value })}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing3 ? playing3.name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlaying3({
																	...playing3,
																	name: value.name,
																	id: value.id
																})
															}>
															{value.name}
														</Dropdown.Item>
													);
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Notes</Form.Label>
									<Form.Control
										type="text"
										placeholder="Something about the game"
										defaultValue={playing3 != null ? playing3.notes : ""}
										onChange={e => setPlaying3({ ...playing3, notes: e.target.value })}
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
							{platforms[0] != null &&
								platforms.map((value, index) => {
									console.log(value);

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
													<Dropdown>
														<Dropdown.Toggle variant="secondary" id="dropdown-basic">
															{store.user.game_progression[value.id].finished != null
																? store.user.game_progression[value.id].finished.name
																: "Select Game"}
														</Dropdown.Toggle>
														<Dropdown.Menu>
															<Form.Control
																type="text"
																placeholder="Game name..."
																onChange={e => handleLook(e.target.value)}
															/>
															{!!gamesFound &&
																gamesFound.map((value, index) => {
																	return (
																		<Dropdown.Item
																			key={index}
																			onClick={e =>
																				setPlaying1({
																					...playing1,
																					name: value.name,
																					id: value.id
																				})
																			}>
																			{value.name}
																		</Dropdown.Item>
																	);
																})}
														</Dropdown.Menu>
													</Dropdown>
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
										{value.name} <i className="far fa-circle" onClick={e => handleMiddleL(value)} />
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
										{value.name} <i className="fas fa-trophy" onClick={e => handleLiked(value)} />{" "}
										<i className="fas fa-skull" onClick={e => handleDisliked(value)} />
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
										{value.name} <i className="far fa-circle" onClick={e => handleMiddleD(value)} />
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row>
				<Button variant="dark" onClick={e => handleSave()}>
					Save Changes
				</Button>
			</Row>
		</Container>
	);
};
