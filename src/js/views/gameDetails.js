import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav } from "react-bootstrap";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const GameDetails = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<Jumbotron fluid className="text-dark">
				<Container>
					<h1>{props.location.state.name}</h1>
					<p>{props.location.state.description}</p>
				</Container>
			</Jumbotron>
			<Nav variant="pills" defaultActiveKey="/home">
				<Nav.Item>
					<Nav.Link href="/home">Active</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-1">Option 2</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="disabled" disabled>
						Disabled
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</Container>
	);
};

GameDetails.propTypes = {
	location: PropTypes.object
};
