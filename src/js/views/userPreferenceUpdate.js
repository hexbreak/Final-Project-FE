import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, ListGroup } from "react-bootstrap";

export const UserPreferenceUpdate = props => {
	const { store, actions } = useContext(Context);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [tags, setTags] = useState([]);
	const [genres, setGenres] = useState([]);
	const [platforms, setPlatforms] = useState([]);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadPlatforms("50");
			actions.loadGenres("50");
		};
		loadSearch();
	}, []);
	useEffect(() => {
		const loadPreferences = () => {
			actions.getPreference("platform");
			actions.getPreference("genre");
			actions.getPreference("tag");
		};
		loadPreferences();
	}, [store.id]);
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
	const makePlatforms = () => {
		let sortedplatforms = [];
		sortedplatforms = store.platforms.map(value => {
			return { id: value.id, name: value.name };
		});
		console.log(store.user_platforms.length);
		if (store.user_platforms.length > 0) {
			store.user_platforms.forEach(value => {
				sortedplatforms = sortedplatforms.filter(platform => platform.id != value.platform_id);
			});
		}
		setPlatforms(sort(sortedplatforms));
	};
	const makeGenres = () => {
		let sortedgenres = [];
		sortedgenres = store.genres.map(value => {
			return { id: value.id, name: value.name };
		});
		if (store.genres_liked.length > 0) {
			store.genres_liked.forEach(value => {
				sortedgenres = sortedgenres.filter(genre => genre.id != value.genre_id);
			});
		}
		if (store.genres_disliked.length > 0) {
			store.genres_disliked.forEach(value => {
				sortedgenres = sortedgenres.filter(genre => genre.id != value.genre_id);
			});
		}
		setGenres(sort(sortedgenres));
	};
	const makeTags = () => {
		let sortedtags = [];
		sortedtags = store.tags.map(value => {
			return { id: value.id, name: value.name };
		});
		if (store.tags_liked.length > 0) {
			store.tags_liked.forEach(value => {
				sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
			});
		}
		if (store.tags_disliked.length > 0) {
			store.tags_disliked.forEach(value => {
				sortedtags = sortedtags.filter(tag => tag.id != value.tag_id);
			});
		}
		setTags(sort(sortedtags));
	};
	useEffect(() => {
		const setPreferences = () => {
			makeTags();
			makePlatforms();
			makeGenres();
		};
		setPreferences();
	}, [store.tags, store.platforms, store.genres]);
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
								<Form.Group as={Col} className="bigScreen" controlId="formGridEmail">
									<Form.Label>Username</Form.Label>
									<Form.Control disabled type="email" placeholder={store.username} />
								</Form.Group>
								<Form.Group as={Col} className="bigScreen" controlId="formGridPassword">
									<Form.Label>New Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										defaultValue={newPassword}
										onChange={e => setNewPassword(e.target.value)}
									/>
								</Form.Group>
								<Form.Group as={Col} className="bigScreen" controlId="formGridPassword">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										defaultValue={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row className="smallScreen">
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label>Username</Form.Label>
									<Form.Control disabled type="text" placeholder={store.username} />
								</Form.Group>
							</Form.Row>
							<Form.Row className="smallScreen">
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label>New Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										defaultValue={newPassword}
										onChange={e => setNewPassword(e.target.value)}
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row className="smallScreen">
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
											onClick={e =>
												actions.handlePreference("platform", "add", value, makePlatforms)
											}
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
							{store.user_platforms.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e =>
												actions.handlePreference("platform", "delete", value, makePlatforms)
											}
										/>
										{value.platform_name}
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
							{store.genres_liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.genre_name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e =>
												actions.handlePreference("genre", "delete", value, makeGenres, "liked")
											}
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
											onClick={e =>
												actions.handlePreference("genre", "add", value, makeGenres, "liked")
											}
										/>
										{value.name}
										<i
											id="hover"
											className="fas fa-skull transform mouse"
											style={{ float: "right" }}
											onClick={e =>
												actions.handlePreference("genre", "add", value, makeGenres, "disliked")
											}
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
							{store.genres_disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e =>
												actions.handlePreference(
													"genre",
													"delete",
													value,
													makeGenres,
													"disliked"
												)
											}
										/>
										{value.genre_name}
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
							{store.tags_liked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										{value.tag_name}
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "right" }}
											onClick={e =>
												actions.handlePreference("tag", "delete", value, makeTags, "liked")
											}
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
											onClick={e =>
												actions.handlePreference("tag", "add", value, makeTags, "liked")
											}
										/>
										{value.name}
										<i
											id="hover"
											className="fas fa-skull transform mouse"
											style={{ float: "right" }}
											onClick={e =>
												actions.handlePreference("tag", "add", value, makeTags, "disliked")
											}
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
							{store.tags_disliked.map((value, index) => {
								return (
									<ListGroup.Item key={index} style={{ color: "black" }} variant="light">
										<i
											id="hover"
											className="far fa-circle transform mouse"
											style={{ float: "left" }}
											onClick={e =>
												actions.handlePreference("tag", "delete", value, makeTags, "disliked")
											}
										/>
										{value.tag_name}
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
