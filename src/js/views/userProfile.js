import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserAbout } from "../component/userAbout.js";
import { UserNowPlaying } from "../component/userNowPlaying";
import { UserFavoriteList } from "../component/userFavoriteList";
import { UserBacklog } from "../component/userBacklog";
import { UserTags } from "../component/userTags";
import { Container, Row, Col, Card, CardImg, CardFooter, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const UserProfile = props => {
	const { store, actions } = useContext(Context);
	return (
		<Container>
			<div className="row row-1">
				<div className="col col-3 mr-3">
					<Card bg="dark">
						<Card.Img
							src={
								store.user.image != undefined
									? store.user.image
									: "https://reactstrap.github.io/assets/318x180.svg"
							}
							width="100%"
						/>
						<Card.Footer>{store.user.username}</Card.Footer>
					</Card>
				</div>
				<div className="col col-8">
					<UserNowPlaying />
				</div>
			</div>
			<br />
			<br />
			<br />
			<div className="row row-two">
				<Col md={{ span: 3, offset: 0 }}>
					<UserAbout />
					<Link to="/editprofile">
						<Button variant="dark">Edit Profile</Button>
					</Link>
					<UserFavoriteList />
				</Col>
				<Col md={{ span: 4, offset: 0 }}>
					<UserBacklog />
				</Col>
			</div>
			<br />
			<br />
			<br />
			<div className="row row-three">
				<Col>
					<UserTags />
				</Col>
			</div>
		</Container>
	);
};
