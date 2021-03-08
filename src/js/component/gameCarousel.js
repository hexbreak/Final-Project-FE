import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

export const GameCarousel = () => {
	const { store, actions } = useContext(Context);
	var history = useHistory();

	return (
		<Carousel style={{ height: "40rem" }}>
			{store.gameList.map((value, index) => {
				return (
					<Carousel.Item key={index}>
						<img className="d-block w-100" src={value.background_image} alt="First slide" />
						<Carousel.Caption>
							<h3
								style={{ cursor: "pointer" }}
								onClick={e =>
									history.push({
										pathname: `/details/${value.id}`,
										state: value.id
									})
								}>
								{value.name}
							</h3>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};
