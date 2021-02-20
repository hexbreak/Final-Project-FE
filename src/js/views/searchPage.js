import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const SearchPage = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="jumbotron">
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

SearchPage.propTypes = {
	location: PropTypes.object
};
