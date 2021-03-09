import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserTags } from "../component/userTags";
import { Container, Row, Col, Card, CardImg, CardFooter, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserLogin = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<Row>
				<Col md={{ span: 3, offset: 0 }}>
					<Card bg="dark" style={{ width: "50rem", height: "100%" }} className="mb-2">
						<Card.Header>Login</Card.Header>
						<Card.Body>
							<Form>
								<Form.Row>
									<Form.Group as={Col} controlId="Username">
										<Form.Label>Username</Form.Label>
										<Form.Control type="text" placeholder="Username" />
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" />
									</Form.Group>
								</Form.Row>

								<Button variant="secondary" type="submit">
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
