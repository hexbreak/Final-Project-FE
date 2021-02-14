import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const UserFavoriteList = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container">
			<div className="d-flex mx-auto justify-content-center">
				<div className="card">
					<input />
					<ul className="list-group list-group-flush custom-fav-list">
						<li className="custom-fav-list">One.</li>
						<li className="custom-fav-list">Two..</li>
						<li className="custom-fav-list">Three!</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

UserFavoriteList.propTypes = {
	game: PropTypes.object
};
