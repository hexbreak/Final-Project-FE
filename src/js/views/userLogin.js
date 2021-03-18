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

export const UserLogin = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container className="space blue">
			<Row>
				<Col>
					<Container style={{ width: "20rem", marginTop: "5rem" }} className="center">
						<h3>Login</h3>
						<Form className="search-margin">
							<Form.Row>
								<Form.Group as={Col} controlId="Username">
									<Form.Label className="input-space">Username</Form.Label>
									<Form.Control
										className="input-space input-shadow"
										type="text"
										placeholder="Username"
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
							</Form.Row>
							<Button variant="success" className="input-space" type="submit">
								Submit
							</Button>
						</Form>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};
