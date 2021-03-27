import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Card, Container, Row, Col, Dropdown, DropdownButton, Button, ListGroup } from "react-bootstrap";
export const UserNowPlaying = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	return (
		<Card bg="light" className="profileCard profileCardBackground shadow center" style={{ maxWidth: "25rem" }}>
			<Card.Header className="profileCardHeader">Is now playing!</Card.Header>
			<ListGroup variant="flush">
				{store.user.playing.map((value, index) => {
					if (value != null) {
						return (
							<ListGroup.Item key={index} variant="light">
								<span
									style={{ cursor: "pointer", float: "left" }}
									onClick={e =>
										history.push({ pathname: `/details/${value.game_id}`, state: value.game_id })
									}>
									{value.game_name}
								</span>
								<i
									id="hover"
									className="fas fa-portrait transform mouse"
									style={{ float: "left", marginLeft: "1rem" }}
									onClick={e => actions.handlePicture(value.game_image)}
								/>
								<span style={{ float: "right", marginLeft: "1rem" }}>{value.notes}</span>
							</ListGroup.Item>
						);
					}
				})}
			</ListGroup>
		</Card>
	);
};
