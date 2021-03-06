import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Dropdown,
	DropdownButton,
	ListGroup,
	Button,
	Tooltip,
	OverlayTrigger
} from "react-bootstrap";

export const UserProfileUpdate = props => {
	const { store, actions } = useContext(Context);
	const [about, setAbout] = useState(store.user.about);
	const [image, setImage] = useState(store.user.image);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [platform1, setPlatform1] = useState(
		!!store.user.platforms[0] ? store.user.platforms[0] : { name: null, id: null }
	);
	const [platform2, setPlatform2] = useState(
		!!store.user.platforms[1] ? store.user.platforms[1] : { name: null, id: null }
	);
	const [platform3, setPlatform3] = useState(
		!!store.user.platforms[2] ? store.user.platforms[2] : { name: null, id: null }
	);
	const [playing1, setPlaying1] = useState(!!store.user.playing[0] ? store.user.playing[0] : { game_name: null });
	const [playing2, setPlaying2] = useState(!!store.user.playing[1] ? store.user.playing[1] : { game_name: null });
	const [playing3, setPlaying3] = useState(!!store.user.playing[2] ? store.user.playing[2] : { game_name: null });
	const [startedP1, setStartedP1] = useState(
		!!store.user.game_progression[0] ? store.user.game_progression[0] : { game_name: null }
	);
	const [finishedP1, setFinishedP1] = useState(
		!!store.user.game_progression[1] ? store.user.game_progression[1] : { game_name: null }
	);
	const [completedP1, setCompletedP1] = useState(
		!!store.user.game_progression[2] ? store.user.game_progression[2] : { game_name: null }
	);
	const [startedP2, setStartedP2] = useState(
		!!store.user.game_progression[3] ? store.user.game_progression[3] : { game_name: null }
	);
	const [finishedP2, setFinishedP2] = useState(
		!!store.user.game_progression[4] ? store.user.game_progression[4] : { game_name: null }
	);
	const [completedP2, setCompletedP2] = useState(
		!!store.user.game_progression[5] ? store.user.game_progression[5] : { game_name: null }
	);
	const [startedP3, setStartedP3] = useState(
		!!store.user.game_progression[6] ? store.user.game_progression[6] : { game_name: null }
	);
	const [finishedP3, setFinishedP3] = useState(
		!!store.user.game_progression[7] ? store.user.game_progression[7] : { game_name: null }
	);
	const [completedP3, setCompletedP3] = useState(
		!!store.user.game_progression[8] ? store.user.game_progression[8] : { game_name: null }
	);
	const [gamesFound, setGamesFound] = useState("");
	const [isLooking, setIsLooking] = useState("");
	const [tags, setTags] = useState([]);
	const [liked, setLiked] = useState(store.user.liked);
	const [disliked, setDisliked] = useState(store.user.disliked);
	let history = useHistory();
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
	const handleHiglights = (gameName, platform) => {
		setIsLooking(gameName);
		fetch(`https://api.rawg.io/api/games?search=${gameName}&page_size=6&platforms=${platform}`)
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
		if (confirmPassword === newPassword) {
			var user = {
				...store.user,
				password: !!confirmPassword ? newPassword : store.user.password,
				about: about,
				image: image,
				platforms: [platform1, platform2, platform3],
				playing: [playing1, playing2, playing3],
				liked: liked,
				disliked: disliked,
				game_progression: [
					startedP1,
					finishedP1,
					completedP1,
					startedP2,
					finishedP2,
					completedP2,
					startedP3,
					finishedP3,
					completedP3
				]
			};
			actions.handleSave(user);
			console.log(user);
			console.log("platform1 check", platform1);
			console.log("platform1 check", platform2);
			history.push("/profile");
			window.scrollTo(0, 0);
		} else {
			setNewPassword("");
			setConfirmPassword("");
			alert("Confirm Password and Password don't match");
		}
	};
	useEffect(() => {
		let makeTags = () => {
			let sortedtags = [];
			sortedtags = store.tags.map(value => {
				return { id: value.id, name: value.name };
			});
			if (liked.length > 0) {
				liked.forEach(value => {
					sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
				});
			}
			if (disliked.length > 0) {
				disliked.forEach(value => {
					sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
				});
			}
			setTags(sort(sortedtags));
		};
		makeTags();
	}, [store.tags]);
	const handleDisliked = tag => {
		let array = [...disliked, { name: tag.name, tag_id: tag.id }];
		array = sort(array);
		setDisliked(array);
		array = tags.filter(value => {
			return value.id != tag.id;
		});
		array = sort(array);
		setTags(array);
	};
	const handleLiked = tag => {
		let array = [...liked, { name: tag.name, tag_id: tag.id }];
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
			return value.tag_id != tag.tag_id;
		});
		array = sort(array);
		setLiked(array);
	};
	const handleMiddleD = tag => {
		let array = [...tags, tag];
		array = sort(array);
		setTags(array);
		array = disliked.filter(value => {
			return value.tag_id != tag.tag_id;
		});
		array = sort(array);
		setDisliked(array);
	};
	const renderStarted = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you just started!
		</Tooltip>
	);
	const renderFinished = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you finished!
		</Tooltip>
	);
	const renderCompleted = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you finished and completed all achivements/content!
		</Tooltip>
	);
	const handleSelect = setMethod => {
		setMethod;
		setGamesFound("");
		setIsLooking("");
	};
	return (
		<Container style={{ backgroundSize: "cover" }} className="space">
			<Row>
				<Card bg="light" style={{ width: "100%", height: "100%" }} className="mb-2">
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
									<Form.Control
										type="password"
										placeholder="Password"
										defaultValue={newPassword}
										onChange={e => setNewPassword(e.target.value)}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										defaultValue={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>Image Url</Form.Label>
									<Form.Control
										type="text"
										placeholder="About user..."
										defaultValue={image}
										onChange={e => setImage(e.target.value)}
									/>
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
				<Card bg="light" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Is now playing!</h5>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown onToggle={e => setIsLooking}>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing1.game_name ? playing1.game_name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													if (
														value.name != playing1.game_name &&
														value.name != playing2.game_name &&
														value.name != playing3.game_name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	handleSelect(
																		setPlaying1({
																			...playing1,
																			game_name: value.name,
																			game_id: value.id,
																			game_image: value.background_image
																		})
																	)
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								{!!playing1.game_name && (
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Notes</Form.Label>
										<Form.Control
											type="text"
											placeholder="Something about the game"
											defaultValue={playing1 != null ? playing1.notes : ""}
											onChange={e => {
												setPlaying1({ ...playing1, notes: e.target.value });
											}}
										/>
									</Form.Group>
								)}
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing2.game_name ? playing2.game_name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													if (
														value.name != playing1.game_name &&
														value.name != playing2.game_name &&
														value.name != playing3.game_name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	handleSelect(
																		setPlaying2({
																			...playing2,
																			game_name: value.name,
																			game_id: value.id,
																			game_image: value.background_image
																		})
																	)
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								{!!playing2.game_name && (
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Notes</Form.Label>
										<Form.Control
											type="text"
											placeholder="Something about the game"
											defaultValue={playing2 != null ? playing2.notes : ""}
											onChange={e => setPlaying2({ ...playing2, notes: e.target.value })}
										/>
									</Form.Group>
								)}
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Game</Form.Label>
									<Dropdown>
										<Dropdown.Toggle variant="secondary" id="dropdown-basic">
											{!!playing3.game_name ? playing3.game_name : "Select Game"}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Form.Control
												type="text"
												placeholder="Game name..."
												onChange={e => handleLook(e.target.value)}
											/>
											{!!gamesFound &&
												gamesFound.map((value, index) => {
													if (
														value.name != playing1.game_name &&
														value.name != playing2.game_name &&
														value.name != playing3.game_name
													) {
														return (
															<Dropdown.Item
																key={index}
																onClick={e =>
																	handleSelect(
																		setPlaying3({
																			...playing3,
																			game_name: value.name,
																			game_id: value.id,
																			game_image: value.background_image
																		})
																	)
																}>
																{value.name}
															</Dropdown.Item>
														);
													}
												})}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>
								{!!playing3.game_name && (
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Notes</Form.Label>
										<Form.Control
											type="text"
											placeholder="Something about the game"
											defaultValue={playing3 != null ? playing3.notes : ""}
											onChange={e => setPlaying3({ ...playing3, notes: e.target.value })}
										/>
									</Form.Group>
								)}
							</Form.Row>
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Card bg="light" style={{ width: "100%", height: "100%" }} className="mb-2">
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
										title={!!platform1.platform_name ? platform1.platform_name : "Select Platform"}>
										{store.platforms[0] != undefined &&
											store.platforms.map((value, index) => {
												if (
													value.name != platform1.platform_name &&
													value.name != platform2.platform_name &&
													value.name != platform3.platform_name
												) {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlatform1({
																	platform_id: value.id,
																	platform_name: value.name
																})
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
										title={!!platform2.platform_name ? platform2.platform_name : "Select Platform"}>
										{store.platforms[0] != undefined &&
											store.platforms.map((value, index) => {
												if (
													value.name != platform1.platform_name &&
													value.name != platform2.platform_name &&
													value.name != platform3.platform_name
												) {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlatform2({
																	platform_id: value.id,
																	platform_name: value.name
																})
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
										title={!!platform3.platform_name ? platform3.platform_name : "Select Platform"}>
										{store.platforms[0] != undefined &&
											store.platforms.map((value, index) => {
												if (
													value.name != platform1.platform_name &&
													value.name != platform2.platform_name &&
													value.name != platform3.platform_name
												) {
													return (
														<Dropdown.Item
															key={index}
															onClick={e =>
																setPlatform3({
																	platform_id: value.id,
																	platform_name: value.name
																})
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
				<Card bg="light" style={{ width: "100%", height: "100%" }} className="mb-2">
					<Card.Header>
						<h5>Highlights</h5>
					</Card.Header>
					<Card.Body>
						<Form>
							{!!platform1.platform_name && (
								<div>
									<h6>{platform1.platform_name}</h6>
									<Form.Row>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderStarted}>
													<span>Started</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!startedP1.game_name ? startedP1.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform1.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP1.game_name &&
																value.name != finishedP1.game_name &&
																value.name != completedP1.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setStartedP1({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderFinished}>
													<span>Finished</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!finishedP1.game_name ? finishedP1.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e => {
															handleHiglights(e.target.value, platform1.platform_id);
														}}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP1.game_name &&
																value.name != finishedP1.game_name &&
																value.name != completedP1.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setFinishedP1({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderCompleted}>
													<span>Completed</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!completedP1.game_name ? completedP1.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform1.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP1.game_name &&
																value.name != finishedP1.game_name &&
																value.name != completedP1.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setCompletedP1({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
									</Form.Row>
								</div>
							)}
							{!!platform2.platform_name && (
								<div>
									<h6>{platform2.platform_name}</h6>
									<Form.Row>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderStarted}>
													<span>Started</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!startedP2.game_name ? startedP2.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform2.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP2.game_name &&
																value.name != finishedP2.game_name &&
																value.name != completedP2.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setStartedP2({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderFinished}>
													<span>Finished</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!finishedP2.game_name ? finishedP2.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform2.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP2.game_name &&
																value.name != finishedP2.game_name &&
																value.name != completedP2.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setFinishedP2({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderCompleted}>
													<span>Completed</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!completedP2.game_name ? completedP2.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform2.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP2.game_name &&
																value.name != finishedP2.game_name &&
																value.name != completedP2.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setCompletedP2({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
									</Form.Row>
								</div>
							)}
							{!!platform3.platform_name && (
								<div>
									<h6>{platform3.platform_name}</h6>
									<Form.Row>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderStarted}>
													<span>Started</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!startedP3.game_name ? startedP3.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform3.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP3.game_name &&
																value.name != finishedP3.game_name &&
																value.name != completedP3.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setStartedP3({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderFinished}>
													<span>Finished</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!finishedP3.game_name ? finishedP3.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform3.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP3.game_name &&
																value.name != finishedP3.game_name &&
																value.name != completedP3.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setFinishedP3({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>
												<OverlayTrigger
													placement="top"
													delay={{ show: 250, hide: 400 }}
													overlay={renderCompleted}>
													<span>Completed</span>
												</OverlayTrigger>
											</Form.Label>
											<Dropdown>
												<Dropdown.Toggle variant="secondary" id="dropdown-basic">
													{!!completedP3.game_name ? completedP3.game_name : "Select Game"}
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Form.Control
														type="text"
														placeholder="Game name..."
														onChange={e =>
															handleHiglights(e.target.value, platform3.platform_id)
														}
													/>
													{!!gamesFound &&
														gamesFound.map((value, index) => {
															if (
																value.name != startedP3.game_name &&
																value.name != finishedP3.game_name &&
																value.name != completedP3.game_name
															) {
																return (
																	<Dropdown.Item
																		key={index}
																		onClick={e =>
																			handleSelect(
																				setCompletedP3({
																					game_name: value.name,
																					game_id: value.id
																				})
																			)
																		}>
																		{value.name}
																	</Dropdown.Item>
																);
															}
														})}
												</Dropdown.Menu>
											</Dropdown>
										</Form.Group>
									</Form.Row>
								</div>
							)}
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row>
				<Col>
					<Card bg="light" id="tags">
						<Card.Header>Liked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e => handleMiddleL(value)}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card id="tags" bg="light">
						<Card.Header>Tags</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{tags.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="fas fa-trophy transform mouse"
											style={{ float: "right" }}
											onClick={e => handleLiked(value)}
										/>
										<i
											id="hover"
											className="fas fa-skull transform mouse"
											style={{ float: "right" }}
											onClick={e => handleDisliked(value)}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card bg="light" id="tags">
						<Card.Header>Disliked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e => handleMiddleD(value)}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row style={{ marginTop: "2rem" }}>
				<Button variant="success" onClick={e => handleSave()}>
					Save Changes
				</Button>
			</Row>
		</Container>
	);
};
