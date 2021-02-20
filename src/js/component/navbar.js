import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";

export const Navbar = () => {
	const [gameName, setGameName] = useState("");
	const { store, actions } = useContext(Context);
	const handleChange = e => {
		setGameName(e.target.value);
		actions.loadSearch(gameName);
	};
	const handleKeyDown = e => {
		if (e.keyCode == 13 && gameName != "") {
			window.open("/search", (target = "_blank"));
			setGameName("");
		}
	};
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 container-fluid">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					Game
					<i className="fas fa-gamepad" />
					Finder
				</span>
			</Link>
			<div className="">
				<div className="dropdown">
					<input
						type="text"
						className="form-control"
						onChange={event => handleChange(event)}
						onKeyDown={e => handleKeyDown(e)}
						placeholder="Search..."
						value={gameName}
						aria-haspopup="true"
						aria-expanded="false"
						style={{ width: "50em" }}
					/>
					{gameName != "" && <i className="fas fa-times float-right" onClick={e => setGameName("")} />}
					{store.searchBar[0] != undefined && gameName != "" && (
						<div
							id="myDropdown"
							aria-labelledby="dropdownMenuButton"
							className="dropdown-content"
							style={{ display: "show", position: "absolute", zIndex: "300" }}>
							{store.searchBar.map((value, index) => {
								return <GameCard className="card" key={index} game={value} />;
							})}
						</div>
					)}
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
