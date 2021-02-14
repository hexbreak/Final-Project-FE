import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserFavoriteList } from "../component/userFavoriteList";
import PropTypes from "prop-types";

export const UserProfile = () => {
	return (
		<div className="container">
			<div className="h1 text-center">H1, Profile Page Header.</div>
			<div className="row">
				<div className="col-" />
				<UserFavoriteList />
				<div className="text-center">test two here!</div>
			</div>
		</div>
	);
};
