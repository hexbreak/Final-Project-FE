import React, { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { debounce } from "lodash";
export const Navbar = () => {
	const [gameName, setGameName] = useState("");
	const { store, actions } = useContext(Context);
	let history = useHistory();

	const debouncedSave = useCallback(
		debounce(nextValue => actions.loadSearch(nextValue), 200),
		[]
	);

	const handleChange = event => {
		const { value: nextValue } = event.target;
		setGameName(nextValue);
		debouncedSave(nextValue);
	};
	const handleKeyDown = e => {
		if (e.keyCode == 13 && gameName != "") {
			history.push({ pathname: "/search", state: { gameName: gameName } });
			setGameName("");
		}
	};
	return (
		<nav className="navbar mb-1 mt-1 container-fluid">
			<span className="navbar-brand mb-0 h1" onClick={e => history.push("/home")} id="hover-logo">
				Game
				<i className="fas fa-gamepad m-2" />
				Finder
			</span>
			<div className="nav-search">
				<div className="dropdown search-bar">
					<input
						type="text"
						className="form-control"
						onChange={handleChange}
						onKeyDown={e => handleKeyDown(e)}
						placeholder="Search..."
						value={gameName}
						aria-haspopup="true"
						aria-expanded="false"
					/>
					{gameName != "" && (
						<i
							className="fas fa-times"
							style={{ position: "absolute", top: "33%", right: "3%" }}
							onClick={e => setGameName("")}
						/>
					)}
					{store.searchBar != undefined && gameName != "" && (
						<div
							id="myDropdown"
							aria-labelledby="dropdownMenuButton"
							className="dropdown-content"
							style={{ display: "show", position: "absolute", zIndex: "300" }}>
							{store.searchBar.map((value, index) => {
								return (
									<GameCard
										id={"navCard"}
										className="card"
										key={index}
										game={value}
										size={"smallCard"}
										cleanSearch={e => setGameName("")}
									/>
								);
							})}
						</div>
					)}
				</div>
				<button className="btn btn-light search-button" onClick={e => history.push("/search")} id="hover">
					<i className="fas fa-search" />
				</button>
			</div>
			{store.id > 0 ? (
				<div className="ml nav-buttons screen-big">
					<button className="btn btn-light" onClick={e => actions.logout(history)} id="hover">
						<span>Logout</span>
					</button>
					<button className="btn btn-light" onClick={e => history.push("/editpreference")} id="hover">
						<span>Preferences</span>
					</button>
					<button className="btn btn-light" onClick={e => history.push("/usergames")} id="hover">
						<span>My Games</span>
					</button>
				</div>
			) : (
				<div className="ml nav-buttons screen-big">
					<button className="btn btn-light" onClick={e => history.push("/login")} id="hover">
						<span>Login</span>
					</button>
					<button className="btn btn-light" onClick={e => history.push("/registration")} id="hover">
						<span>Sign Up</span>
					</button>
				</div>
			)}
			{store.id > 0 ? (
				<Dropdown className="smallScreen">
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						<i className="fas fa-user-tie" />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item className="btn btn-light" id="hover" onClick={e => history.push("/usergames")}>
							My Games
						</Dropdown.Item>
						<Dropdown.Item
							className="btn btn-light"
							id="hover"
							onClick={e => history.push("/editpreference")}>
							Preferences
						</Dropdown.Item>
						<Dropdown.Item className="btn btn-light" id="hover" onClick={e => actions.logout(history)}>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			) : (
				<Dropdown className="smallScreen">
					<Dropdown.Toggle variant="light" id="dropdown-basic">
						<i className="fas fa-user" />
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item className="btn btn-light" id="hover" onClick={e => history.push("/login")}>
							Login
						</Dropdown.Item>
						<Dropdown.Item
							className="btn btn-light"
							id="hover"
							onClick={e => history.push("/registration")}>
							Register
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</nav>
	);
};
