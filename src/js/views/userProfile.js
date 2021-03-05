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
		<div className="container container-profile mt-5">
			<div className="row row-1">
				<div className="col col-">
					<div className="user-name">{store.user.username}</div>
					<div className="card-profile">
						<img
							className="profile-img"
							src={
								store.user.image != undefined
									? store.user.image
									: "https://reactstrap.github.io/assets/318x180.svg"
							}
							width="100%"
						/>
						<div className="card-body">
							<UserAbout />
							<Link to="/editprofile">
								<Button variant="dark">Edit Profile</Button>
							</Link>
						</div>
					</div>
				</div>
				<div className="col col- topcol">
					<UserNowPlaying />
				</div>
				<div className="col col- topcol">
					<UserFavoriteList />
				</div>
			</div>
			<br />
			<br />
			<br />
			<div className="row row-two">
				<Col md={{ span: 3, offset: 0 }}>
					<Link to="/editprofile">
						<Button variant="dark">Edit Profile</Button>
					</Link>
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
		</div>
	);
};
