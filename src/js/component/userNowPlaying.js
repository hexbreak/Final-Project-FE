import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const UserNowPlaying = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="list-group text-primary">
			<div className="list-group-item active">1. Currently Played Game ID goes here!</div>
			<div className="list-group-item">2. [ Title Game ID saved to User ]</div>
			<div className="list-group-item">2. [ Title Game ID saved to User ]</div>
			<div className="list-group-item">2. [ Title Game ID saved to User ]</div>
			<div className="list-group-item">2. [ Title Game ID saved to User ]</div>
		</div>
	);
};
