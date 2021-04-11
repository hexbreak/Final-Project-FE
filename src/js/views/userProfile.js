// import React, { useState, useEffect, useContext } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import { UserAbout } from "../component/userAbout.js";
// import { UserNowPlaying } from "../component/userNowPlaying";
// import { UserFavoriteList } from "../component/userFavoriteList";
// import { UserHighlights } from "../component/userHighlights";
// import { UserTags } from "../component/userTags";
// import { Container, Row, Col, Card, CardImg, CardFooter, Button } from "react-bootstrap";
// import PropTypes from "prop-types";

// export const UserProfile = props => {
// 	const { store, actions } = useContext(Context);
// 	useEffect(() => {
// 		const loadFavorites = () => {
// 			actions.getFavorites(store.user.id);
// 		};
// 		loadFavorites();
// 	}, []);
// 	return (
// 		<Container
// 			fluid
// 			style={{
// 				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
// 				paddingBottom: "3rem"
// 			}}
// 			className="space">
// 			<Container className="container-profile">
// 				<Row className="search-margin">
// 					<Col>
// 						<div className="user-name center">{store.user.username}</div>
// 						<div className="card-profile shadow center search-margin">
// 							<img
// 								className="profile-img"
// 								src={
// 									!!store.user.image
// 										? store.user.image
// 										: "https://cdn.pixabay.com/photo/2017/10/25/19/45/arrow-2889040_960_720.jpg"
// 								}
// 								width="100%"
// 							/>
// 							<div className="card-body">
// 								<UserAbout />
// 								<Link to="/editprofile">
// 									<Button variant="success" onClick={e => window.scrollTo(0, 0)}>
// 										Edit Profile
// 									</Button>
// 								</Link>
// 							</div>
// 						</div>
// 					</Col>
// 				</Row>
// 				<Row className="search-margin">
// 					<Col sm={6}>
// 						<UserNowPlaying />
// 					</Col>
// 					<Col sm={6}>
// 						<UserFavoriteList />
// 					</Col>
// 				</Row>
// 				<Row className="search-margin">
// 					<Col>
// 						<UserHighlights />
// 					</Col>
// 				</Row>
// 				<Row className="search-margin">
// 					<Col className="space">
// 						<UserTags />
// 					</Col>
// 				</Row>
// 			</Container>
// 		</Container>
// 	);
// };
