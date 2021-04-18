import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, ListGroup, Button, Tooltip } from "react-bootstrap";

export const UserPreferenceUpdate = props => {
	const { store, actions } = useContext(Context);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [tags, setTags] = useState([]);
	const [tags_liked, setTagsLiked] = useState(store.tags_liked);
	const [tags_disliked, setTagsDisliked] = useState(store.tags_disliked);
	const [genres, setGenres] = useState([]);
	const [genres_liked, setGenresLiked] = useState(store.genres_liked);
	const [genres_disliked, setGenresDisliked] = useState(store.genres_disliked);
	const [platforms, setPlatforms] = useState([]);
	const [userPlatforms, setUserPlatforms] = useState(store.user_platforms);

	let history = useHistory();
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadPlatforms("50");
			actions.loadGenres("50");
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
	const handleSave = () => {
		if (confirmPassword === newPassword) {
			var user = {
				...store.user,
				password: !!confirmPassword ? newPassword : store.password,
				about: about,
				image: image,
				platforms: [platform1, platform2, platform3],
				liked: liked,
				disliked: disliked
			};
			actions.handleSave(user);
			history.push("/profile");
			window.scrollTo(0, 0);
		} else {
			setNewPassword("");
			setConfirmPassword("");
			alert("Confirm Password and Password don't match");
		}
	};
	useEffect(() => {
		let makePlatforms = () => {
			let sortedplatforms = [];
			sortedplatforms = store.platforms.map(value => {
				return { id: value.id, name: value.name };
			});
			if (userPlatforms.length > 0) {
				userPlatforms.forEach(value => {
					sortedplatforms = sortedplatforms.filter(platform => platform.id != value.platform_id);
				});
			}
			setPlatforms(sort(sortedplatforms));
		};
		let makeGenres = () => {
			let sortedgenres = [];
			sortedgenres = store.genres.map(value => {
				return { id: value.id, name: value.name };
			});
			if (genres_liked.length > 0) {
				genres_liked.forEach(value => {
					sortedgenres = sortedgenres.filter(genre => genre.id != value.genre_id);
				});
			}
			if (genres_disliked.length > 0) {
				genres_disliked.forEach(value => {
					sortedgenres = sortedgenres.filter(genre => genre.id != value.genre_id);
				});
			}
			setGenres(sort(sortedgenres));
		};
		let makeTags = () => {
			let sortedtags = [];
			sortedtags = store.tags.map(value => {
				return { id: value.id, name: value.name };
			});
			if (tags_liked.length > 0) {
				liked.forEach(value => {
					sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
				});
			}
			if (tags_disliked.length > 0) {
				disliked.forEach(value => {
					sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
				});
			}
			setTags(sort(sortedtags));
		};
		makePlatforms();
		makeGenres();
		makeTags();
	}, [store.tags_liked, store.tags_disliked, store.platforms, store.genres_liked, store.genres_disliked]);
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
									<Form.Control disabled type="email" placeholder={store.username} />
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
									<Form.Label>Email</Form.Label>
									<Form.Control disabled type="email" placeholder={store.email} />
								</Form.Group>
							</Form.Row>
						</Form>
					</Card.Body>
				</Card>
			</Row>
			<Row className="content">
				<Col>
					<Card bg="light" className="center" id="tags">
						<Card.Header>Platform</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{platforms.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="fas fa-trophy transform mouse"
											style={{ float: "right" }}
											onClick={e => actions.handlePreference("platform", "add", value)}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card id="tags" className="center" bg="light">
						<Card.Header>User Platforms</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{userPlatforms.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e => actions.handlePreference("platform", "delete", value)}
										/>
										{value.name}
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row className="content">
				<Col>
					<Card bg="light" className="detail" id="tags">
						<Card.Header>Liked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{genres_liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e => actions.handlePreference("genre", "delete", value, "liked")}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card id="tags" className="detail" bg="light">
						<Card.Header>Genres</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{genres.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="fas fa-trophy transform mouse"
											style={{ float: "left" }}
											onClick={e => actions.handlePreference("genre", "add", value, "liked")}
										/>
										{value.name}
										<i
											id="hover"
											className="fas fa-skull transform mouse"
											style={{ float: "right" }}
											onClick={e => actions.handlePreference("genre", "add", value, "disliked")}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card bg="light" className="detail" id="tags">
						<Card.Header>Disliked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{genres_disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e =>
												actions.handlePreference("genre", "delete", value, "disliked")
											}
										/>
										{value.name}
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row className="content">
				<Col>
					<Card bg="light" className="detail" id="tags">
						<Card.Header>Liked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{tags_liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e => actions.handlePreference("tag", "delete", value, "liked")}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card id="tags" className="detail" bg="light">
						<Card.Header>Tags</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{tags.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="fas fa-trophy transform mouse"
											style={{ float: "left" }}
											onClick={e => actions.handlePreference("tag", "add", value, "liked")}
										/>
										{value.name}
										<i
											id="hover"
											className="fas fa-skull transform mouse"
											style={{ float: "right" }}
											onClick={e => actions.handlePreference("tag", "add", value, "disliked")}
										/>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Card>
				</Col>
				<Col>
					<Card bg="light" className="detail" id="tags">
						<Card.Header>Disliked</Card.Header>
						<ListGroup id="tagsContent" variant="flush">
							{tags_disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e => actions.handlePreference("tag", "delete", value, "disliked")}
										/>
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
