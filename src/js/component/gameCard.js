import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCard = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
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
		let platformColor = "text-light";
		props.game.platforms.forEach(value => {
			store.user_platforms.forEach(platform => {
				if (value.platform.id == platform.platform_id) {
					platformColor = "text-success";
				}
			});
		});
		return platformColor;
	};
	const checkGenre = () => {
		let genreColor = "text-light";
		props.game.genres.forEach(value => {
			store.genres_liked.forEach(genre => {
				if (value.id == genre.genre_id && genreColor != "text-light") {
					genreColor = "text-warning";
				} else if (value.id == genre.genre_id) {
					genreColor = "text-success";
				}
			});
			store.genres_disliked.forEach(genre => {
				if (value.id == genre.genre_id && genreColor != "text-light") {
					genreColor = "text-warning";
				} else if (value.id == genre.genre_id) {
					genreColor = "text-danger";
				}
			});
		});
		return genreColor;
	};
	const checkTags = () => {
		let tagColor = "text-light";
		props.game.tags.forEach(value => {
			store.tags_liked.forEach(tags => {
				if (value.id == tags.tag_id && tagColor != "text-light") {
					tagColor = "text-warning";
				} else if (value.id == tags.tag_id) {
					tagColor = "text-success";
				}
			});
			store.tags_disliked.forEach(tags => {
				if (value.id == tags.tag_id && tagColor != "text-light") {
					tagColor = "text-warning";
				} else if (value.id == tags.tag_id) {
					tagColor = "text-danger";
				}
			});
		});
		return tagColor;
	};
	return (
		<Card
			id={props.id}
			style={{ marginBottom: "1rem", cursor: "pointer" }}
			className="bg-dark rounded-3 mr-3 ml-3 text-white transform"
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
				<Card.Title>{props.game.name}</Card.Title>
				<Card.Text>
					{store.preference == true > 0 && (
						<>
							{/* <span className={checkPlatform()}>P</span>
							<span className={checkGenre()}>G</span> */}
							<span className={checkTags()}>T</span>
						</>
					)}
				</Card.Text>
			</Card.ImgOverlay>
		</Card>
	);
};
GameCard.propTypes = {
	game: PropTypes.object,
	cleanSearch: PropTypes.func,
	id: PropTypes.string
};
