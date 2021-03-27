import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button, ListGroup } from "react-bootstrap";
export const UserTags = () => {
	const { store, actions } = useContext(Context);
	return (
		<Container className="center">
			<Row className="search-margin">
				<Col>
					<Card id="profile-tags" className="profileCardBackground center">
						<Card.Header className="profileCardHeader centerText">Liked</Card.Header>
						<Card.Text id="profile-tagsBackground" className="centerText">
							{store.user.liked.map((value, index) => {
								if (index != store.user.liked.length - 1) {
									return `${value.name}, `;
								} else {
									return `${value.name}`;
								}
							})}
						</Card.Text>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col className="search-margin">
					<Card id="profile-tags" className="profileCardBackground center">
						<Card.Header className="profileCardHeader centerText">Disliked</Card.Header>
						<Card.Text id="profile-tagsBackground" className="centerText">
							{store.user.disliked.map((value, index) => {
								if (index != store.user.disliked.length - 1) {
									return `${value.name}, `;
								} else {
									return `${value.name}`;
								}
							})}
						</Card.Text>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
