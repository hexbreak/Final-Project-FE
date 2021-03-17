import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, Row, Col, Dropdown, DropdownButton, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserFavoriteList = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
<<<<<<< HEAD
=======
	console.log(store.user.favorites);

>>>>>>> 5d26219100c560813f7a304a01bb8fe3aef316ba
	return (
		<Card bg="light" className="profileCard" style={{ maxWidth: "25rem" }}>
			<Card.Header>Favorites</Card.Header>
			<ListGroup variant="flush light">
				{store.user.favorites.map((value, index) => {
					return (
						<ListGroup.Item variant="light" key={index}>
							<span
								onClick={e => history.push({ pathname: `/details/${value.id}`, state: value.id })}
								style={{ cursor: "pointer" }}>
								{value.name}
							</span>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</Card>
	);
};

UserFavoriteList.propTypes = {
	game: PropTypes.object
};
