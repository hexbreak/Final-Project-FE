import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownButton, Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const SearchPageDropdown = props => {
	const { store, actions } = useContext(Context);
	const [genre, setGenre] = useState("Genres");
	const [tag, setTag] = useState("Tags");
	const [platform, setPlatform] = useState("Platforms");
	const handleGenre = (name, id) => {
		setGenre(name);
		props.setGenres(id);
	};
	const handleTag = (name, id) => {
		setTag(name);
		props.setTags(id);
	};
	const handlePlatform = (name, id) => {
		setPlatforms(name);
		props.setPlatforms(id);
	};
	return (
		<Container>
			<Row>
				<Col className="col-12">
					<DropdownButton
						className="center btn-fontsize btn-font"
						variant="success"
						style={{ margin: "1rem 0" }}
						title={genre.charAt(0).toUpperCase() + genre.slice(1)}>
						{store.genres.map((value, index) => {
							return (
								<Dropdown.Item
									key={index}
									variant="dark"
									onClick={e => handleGenre(value.name, value.id)}>
									{value.name}
								</Dropdown.Item>
							);
						})}
					</DropdownButton>
				</Col>
				<Col className="col-12">
					<DropdownButton
						className="center btn-fontsize btn-font"
						variant="success"
						style={{ margin: "1rem 0" }}
						title={tag.charAt(0).toUpperCase() + tag.slice(1)}>
						{store.tags.map((value, index) => {
							return (
								<Dropdown.Item
									key={index}
									variant="dark"
									onClick={e => handleTag(value.name, value.id)}>
									{value.name}
								</Dropdown.Item>
							);
						})}
					</DropdownButton>
				</Col>
				<Col className="col-12">
					<DropdownButton
						className="center btn-fontsize btn-font"
						variant="success"
						style={{ margin: "1rem 0" }}
						title={platform.charAt(0).toUpperCase() + platform.slice(1)}>
						{store.platforms.map((value, index) => {
							return (
								<Dropdown.Item
									key={index}
									variant="dark"
									onClick={e => handlePlatform(value.name, value.id)}>
									{value.name}
								</Dropdown.Item>
							);
						})}
					</DropdownButton>
				</Col>
			</Row>
		</Container>
	);
};
SearchPageDropdown.propTypes = {
	setGenres: PropTypes.func,
	setTags: PropTypes.func,
	setPlatforms: PropTypes.func
};
