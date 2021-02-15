import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserFavoriteList } from "../component/userFavoriteList";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

export const UserProfile = () => {
	return (
		<Container>
			<Row>
				<Col xs={12} md={8}>
					<div className="h1 text-center">H1, Profile Page Header.</div>
				</Col>
				<Col xs={6} md={4}>
					<div className="text-center">test two here!</div>
				</Col>
			</Row>
		</Container>
	);
};
