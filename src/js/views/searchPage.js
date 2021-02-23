import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import PropTypes from "prop-types";

export const SearchPage = props => {
	const { store, actions } = useContext(Context);
	const [gameName, setGameName] = useState("");
	const handleChange = e => {
		setGameName(e.target.value);
		actions.loadSuperSearch(gameName);
	};
	var counter = 0;
	return (
		<Container fluid>
			<Row>
				<Col>
					<div className="jumbotron">
						<Link to="/">
							<span className="btn btn-primary btn-lg" href="#" role="button">
								Back home
							</span>
						</Link>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type="text"
						className="form-control"
						onChange={event => handleChange(event)}
						placeholder="Search..."
						value={gameName}
						aria-haspopup="true"
						aria-expanded="false"
						style={{ width: "50em" }}
					/>
					{gameName != "" && <i className="fas fa-times float-right" onClick={e => setGameName("")} />}
				</Col>
			</Row>
			{store.superSearch[0] != undefined &&
				gameName != "" &&
				store.superSearch.map((value, index) => {
					return (
						<Row key={index}>
							{index < 20 && (
								<Col>
									<GameCard className="card" game={value} />
								</Col>
							)}
						</Row>
					);
				})}
		</Container>
	);
};

SearchPage.propTypes = {
	location: PropTypes.object
};
