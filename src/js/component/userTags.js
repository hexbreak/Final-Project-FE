import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button, ListGroup } from "react-bootstrap";
export const UserTags = () => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<Card className="profileCardBackground shadow" id="tags" style={{ float: "left" }}>
				<Card.Header className="profileCardHeader">Liked</Card.Header>
				<ListGroup variant="flush">
					{store.user.tags.liked.map((value, index) => {
						return (
							<ListGroup.Item key={index} variant="light">
								{value.name}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Card>
			<Card className="profileCardBackground shadow" id="tags" style={{ float: "right" }}>
				<Card.Header className="profileCardHeader">Disliked</Card.Header>
				<ListGroup variant="flush">
					{store.user.tags.disliked.map((value, index) => {
						return (
							<ListGroup.Item key={index} variant="light">
								{value.name}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Card>
		</Container>
	);
};
