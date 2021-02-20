import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";

export const Navbar = () => {
	const [gameName, setGameName] = useState("");
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					Game
					<i className="fas fa-gamepad" />
					Finder
				</span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<input
						onChange={event => setGameName(event.target.value)}
						value={gameName}
						placeholder="Search..."
					/>
					<div id="myDropdown" className="dropdown-content">
						{store.searchBar.map(value => {
							return <GameCard className="card" key={index} game={value} />;
						})}
					</div>
				</div>
			</div>
			<div className="ml">
				<Link to="/profile">
					<button className="btn btn-light">Profile</button>
				</Link>
			</div>
		</nav>
	);
};
