import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, Row, Col, Dropdown, DropdownButton, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserFavoriteList = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	return (
		<Card bg="light" className="profileCard profileCardBackground shadow" style={{ maxWidth: "25rem" }}>
			<Card.Header className="profileCardHeader">Favorites</Card.Header>
			<ListGroup variant="flush light">
				{store.user.favorites.map((value, index) => {
					if (index < 3) {
						return (
							<ListGroup.Item variant="light" key={index}>
								<span
									onClick={e =>
										history.push({ pathname: `/details/${value.game_id}`, state: value.game_id })
									}
									style={{ cursor: "pointer" }}>
									{value.game_name}
								</span>
							</ListGroup.Item>
						);
					}
				})}
				{store.favorites.length > 3 && (
					<ListGroup.Item variant="light">
						<Button onClick={e => history.push("/favorites")} id="viewmore">
							View More
						</Button>
					</ListGroup.Item>
				)}
			</ListGroup>
		</Card>
	);
};

UserFavoriteList.propTypes = {
	game: PropTypes.object
};
