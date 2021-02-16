import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserGenre } from "../component/userGenre";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardImg, CardFooter } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfile = props => {
	const { store, actions } = useContext(Context);
	console.log(store);
	return (
		<Container>
			<Row>
				<Col md={{ span: 3, offset: 0 }}>
					<Card>
						<Card.Img src="https://reactstrap.github.io/assets/318x180.svg" width="100%" />
						<Card.Footer>User Name</Card.Footer>
					</Card>
				</Col>
				<Col md={{ span: 8, offset: 1 }}>
					<UserNowPlaying />
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 3, offset: 0 }}>
					<UserAbout />
				</Col>
				<Col md={{ span: 4, offset: 0 }}>
					<UserBacklog />
				</Col>
				<Col md={{ span: 4, offset: 1 }}>
					<div className="test">Text Goes Here</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<UserGenre />
				</Col>
			</Row>
		</Container>
	);
};
