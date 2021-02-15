import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserFavoriteList } from "../component/userFavoriteList";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardImg, CardFooter } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfile = () => {
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
					<ListGroup>
						<ListGroup.Item>Test!</ListGroup.Item>
						<ListGroup.Item>Test!</ListGroup.Item>
						<ListGroup.Item>Test!</ListGroup.Item>
						<ListGroup.Item>Test!</ListGroup.Item>
						<ListGroup.Item>Test!</ListGroup.Item>
					</ListGroup>
					<div className="text-center">test two here!</div>
				</Col>
			</Row>
		</Container>
	);
};
