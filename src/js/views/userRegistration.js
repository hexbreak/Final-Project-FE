import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserHighlights } from "../component/userHighlights";
import { UserTags } from "../component/userTags";
import { Container, Row, Col, Card, CardImg, CardFooter, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserRegistration = props => {
	const { store, actions } = useContext(Context);
	const [newUsername, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	return (
		<Container className="space blue">
			<Row>
				<Col>
					<Container style={{ width: "30rem", marginTop: "5rem" }} className="center">
						<h3>Registration</h3>
						<Form className="search-margin">
							<Form.Row>
								<Form.Group as={Col} controlId="Username">
									<Form.Label className="input-space">Username</Form.Label>
									<Form.Control
										onChange={e => setNewUserName(e.target.value)}
										className="input-space input-shadow"
										type="text"
										placeholder="Username"
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="Email">
									<Form.Label className="input-space">Email</Form.Label>
									<Form.Control
										onChange={e => setNewEmail(e.target.value)}
										className="input-space input-shadow"
										type="email"
										placeholder="Email"
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label className="input-space">Password</Form.Label>
									<Form.Control
										className="input-space input-shadow"
										type="password"
										placeholder="Password"
									/>
								</Form.Group>

								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="input-space">Confirm Password</Form.Label>
									<Form.Control
										onChange={e => setNewPassword(e.target.value)}
										className="input-space input-shadow"
										type="password"
										placeholder="Confirm Password"
									/>
								</Form.Group>
							</Form.Row>

							<Button
								onClick={() => actions.registerUser(newUsername, newEmail, newPassword)}
								variant="success"
								className="input-space"
								type="submit">
								Submit
							</Button>
						</Form>
					</Container>
					<div style={{ marginTop: "2rem" }} className="center">
						<a href="/login">Already have an account?</a>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
