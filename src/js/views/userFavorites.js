import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
	Jumbotron,
	Card,
	Container,
	Row,
	Col,
	Nav,
	Sonnet,
	Button,
	ToggleButton,
	ToggleButtonGroup,
	ButtonGroup
} from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
import PropTypes from "prop-types";

export const UserFavorites = props => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		const loadFavorites = () => {
			actions.getFavorites(store.user.id);
		};
		loadFavorites();
	}, []);
	return (
		<Container
			fluid
			style={{
				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
				paddingBottom: "3rem"
			}}
			className="space center">
			<Row className="search-margin center">
				<Col sm={11}>
					<Row className="search-margin">
						{store.superSearch[0] != undefined &&
							store.favorites.map((value, index) => {
								return <GameCard className="card" key={index} game={value} />;
							})}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

UserFavorites.propTypes = {
	location: PropTypes.object
};
