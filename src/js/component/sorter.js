import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const Sorter = props => {
	const { store, actions } = useContext(Context);
	const handleSort = sorted => {
		props.setSort(sorted);
		props.setPagination(1);
	};
	return (
		<Container>
			<Row>
				<div className="center">
					<Button
						id="ascendingbtn"
						variant="primary"
						className="btn-fontsize"
						onClick={
							props.inverted == false ? e => props.setInverted(true) : e => props.setInverted(false)
						}>
						{props.inverted == false ? (
							<i className="fas fa-sort-up btn-fontsize" />
						) : (
							<i className="fas fa-sort-down btn-fontsize" />
						)}
					</Button>
					{store.id > 0 && (
						<Button id="toggletags" variant="secondary" onClick={e => actions.changePreference()}>
							{store.preference == false ? (
								<i className="fas fa-chess-pawn" />
							) : (
								<i className="fas fa-chess-king" />
							)}
						</Button>
					)}
				</div>
				<DropdownButton
					className="center btn-fontsize"
					variant="success"
					title={props.sortKey.charAt(0).toUpperCase() + props.sortKey.slice(1)}>
					<Dropdown.Item variant="dark" onClick={e => handleSort("name")}>
						Name
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("released")}>
						Released
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("added")}>
						Added
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("created")}>
						Created
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("updated")}>
						Updated
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("rating")}>
						Rating
					</Dropdown.Item>
					<Dropdown.Item variant="dark" onClick={e => handleSort("metacritic")}>
						Metacritic
					</Dropdown.Item>
				</DropdownButton>
			</Row>
		</Container>
	);
};
Sorter.propTypes = {
	setSort: PropTypes.func,
	setInverted: PropTypes.func,
	inverted: PropTypes.bool,
	sortKey: PropTypes.string,
	setPagination: PropTypes.func
};
