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
		<Container
			fluid
			style={{
				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
				paddingBottom: "3rem"
			}}
			className="space">
			<div className="container container-profile mt-5">
				<div className="row row-1">
					<div className="col col- search-margin">
						<div className="user-name">{store.user.username}</div>
						<div className="card-profile">
							<img
								className="profile-img"
								src={
									!!store.user.image
										? store.user.image
										: "https://cdn.pixabay.com/photo/2017/10/25/19/45/arrow-2889040_960_720.jpg"
								}
								width="100%"
							/>
							<div className="card-body">
								<UserAbout />
								<Link to="/editprofile">
									<Button variant="light">Edit Profile</Button>
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
					<Col md={{ span: 4, offset: 0 }}>
						<UserBacklog />
					</Col>
				</div>
				<br />
				<br />
				<br />
				<div className="row space row-three">
					<Col className="space">
						<UserTags />
					</Col>
				</div>
			</div>
		</Container>
	);
};
