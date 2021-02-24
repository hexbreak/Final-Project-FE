import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";

export const Navbar = () => {
	const [gameName, setGameName] = useState("");
	const { store, actions } = useContext(Context);
	let history = useHistory();
	useEffect(() => {
		const search = () => {
			actions.loadSearch(gameName);
		};
		search();
	}, [gameName]);
	const handleKeyDown = e => {
		if (e.keyCode == 13 && gameName != "") {
			history.push("/search");
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
						onChange={event => setGameName(event.target.value)}
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
				<Link to="/search">
					<button className="btn btn-light">Search</button>
				</Link>
			</div>
			<div className="ml">
				<Link to="/profile">
					<button className="btn btn-light">Profile</button>
				</Link>
			</div>
		</nav>
	);
};
