import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserFavoriteList } from "../component/userFavoriteList";
import { Container, Row, Col } from "react-bootstrap";
import { Card, CardImg, CardFooter } from "react-bootstrap";
import { AboutUser } from "../component/aboutUser.js";
import PropTypes from "prop-types";

export const UserProfile = props => {
	const { store, actions } = useContext(Context);
	console.log(store);
	actions.loadGameList(2); // page 2
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
					<div className="list-group text-primary">
						<div className="list-group-item active">1. Currently Played Game ID goes here!</div>
						<div className="list-group-item">{store.gameList[0].name}</div>
						<div className="list-group-item">{store.gameList[3].name}</div>
						<div className="list-group-item">{store.gameList[7].name}</div>
						<div className="list-group-item">{store.gameList[10].name}</div>
					</div>
					<div className="text-center">test two here!</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<AboutUser />
				</Col>
			</Row>
		</Container>
	);
};
