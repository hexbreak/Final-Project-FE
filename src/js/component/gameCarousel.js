import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel, Image } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCarousel = () => {
	const { store, actions } = useContext(Context);
	var history = useHistory();

	return (
		<Carousel
			style={{ height: "40rem", width: "90rem", boxShadow: "-0.813rem 5.313rem 1.125rem rgb(0 0 0 / 47%)" }}>
			{store.gameList.map((value, index) => {
				return (
					<Carousel.Item key={index}>
						<Image
							rounded
							className="d-block w-100"
							src={value.background_image}
							alt="First slide"
							id="carousel-image"
						/>
						<Carousel.Caption>
							<br />
							<h1
								className="carousel-heading"
								style={{ cursor: "pointer" }}
								onClick={e =>
									history.push({
										pathname: `/details/${value.id}`,
										state: value.id
									})
								}>
								{value.name}
							</h1>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
