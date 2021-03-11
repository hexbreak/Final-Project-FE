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
			history.push({ pathname: "/search", state: gameName });
			setGameName("");
		}
	};
	return (
		<nav className="navbar navbar-dark mb-1 mt-1 container-fluid">
			<Link to="/">
				<span className="navbar-brand mb-0 h1" id="logo">
					Game
					<i className="fas fa-gamepad m-2" />
					Finder
				</span>
			</Link>
			<Row>
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
				<Link to="/search">
					<button className="btn btn-light ml-5 pl-4 pr-4" id="hover">
						<i className="fas fa-search" />
					</button>
				</Link>
			</Row>
			{store.user.id > 0 ? (
				<div className="ml">
					<Link to="/profile">
						<button className="btn btn-light pl-4 pr-4">
							<span id="hover">Profile</span>
						</button>
					</Link>
				</div>
			) : (
				<div className="ml">
					<Link to="/login">
						<button style={{ marginRight: "1rem" }} className="btn btn-light ">
							<span id="hover">Login</span>
						</button>
					</Link>
					<Link to="/registration">
						<button className="btn btn-light">
							<span id="hover">Sign Up</span>
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
};
