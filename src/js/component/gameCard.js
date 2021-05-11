import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCard = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	let filters = `cardFilters ${props.size}`;
	//Clean searchbar and takes you to details
	const handleClick = e => {
		if (props.cleanSearch != undefined) {
			props.cleanSearch();
		}
		history.push({ pathname: `/details/${props.game.id}`, state: props.game.id });
		window.scrollTo(0, 0);
	};
	//Make color for tags from tag ids
	const checkPlatform = () => {
		let platformColor = "normal";
		props.game.platforms.forEach(value => {
			store.user_platforms.forEach(platform => {
				if (value.platform.id == platform.platform_id) {
					platformColor = "liked";
				}
			});
		});
		return platformColor;
	};
	const checkGenre = () => {
		let genreColor = "normal";
		props.game.genres.forEach(value => {
			store.genres_liked.forEach(genre => {
				if (value.id == genre.genre_id && genreColor != "normal") {
					genreColor = "mixed";
				} else if (value.id == genre.genre_id) {
					genreColor = "liked";
				}
			});
			store.genres_disliked.forEach(genre => {
				if (value.id == genre.genre_id && genreColor != "normal") {
					genreColor = "mixed";
				} else if (value.id == genre.genre_id) {
					genreColor = "disliked";
				}
			});
		});
		return genreColor;
	};
	const checkTags = () => {
		let tagColor = "normal";
		props.game.tags.forEach(value => {
			store.tags_liked.forEach(tags => {
				if (value.id == tags.tag_id && tagColor != "normal") {
					tagColor = "mixed";
				} else if (value.id == tags.tag_id) {
					tagColor = "liked";
				}
			});
			store.tags_disliked.forEach(tags => {
				if (value.id == tags.tag_id && tagColor != "normal") {
					tagColor = "mixed";
				} else if (value.id == tags.tag_id) {
					tagColor = "disliked";
				}
			});
		});
		return tagColor;
	};
	return (
		<Card
			id={props.id}
			style={{ marginBottom: "1rem", cursor: "pointer" }}
			className="bg-dark rounded-3 text-white transform"
			onClick={e => handleClick(e)}>
			<Card.Img
				className="card-img"
				src={
					props.game.background_image != null
						? props.game.background_image
						: "https://cdn.pixabay.com/photo/2020/12/14/15/48/light-bulb-5831252_960_720.jpg"
				}
				alt="Card Image"
			/>
			<Card.ImgOverlay id="card">
				<Card.Title className="game-card-title">{props.game.name}</Card.Title>
				<Card.Text>
					{store.preference == true > 0 && (
						<div className={filters}>
							{props.game.platforms != undefined && <span className={checkPlatform()}>P</span>}
							{props.game.genres != undefined && <span className={checkGenre()}>G</span>}
							{props.game.tags != undefined && <span className={checkTags()}>T</span>}
						</div>
					)}
				</Card.Text>
			</Card.ImgOverlay>
		</Card>
	);
};
GameCard.propTypes = {
	game: PropTypes.object,
	cleanSearch: PropTypes.func,
	id: PropTypes.string,
	size: PropTypes.string
};
