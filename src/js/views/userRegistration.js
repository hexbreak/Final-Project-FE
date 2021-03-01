import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserTags } from "../component/userTags";
import { Container, Row, Col, Card, CardImg, CardFooter } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserRegistration = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<Row>
				<Col md={{ span: 3, offset: 0 }}>

				</Col>
			</Row>
		</Container>
	);
};
