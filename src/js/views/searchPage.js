import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
	Jumbotron,
	Card,
	Container,
	Row,
	Col,
	Nav,
	Sonnet,
	Button,
	ToggleButton,
	ToggleButtonGroup
} from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
import PropTypes from "prop-types";

export const SearchPage = props => {
	const { store, actions } = useContext(Context);
	const [gameName, setGameName] = useState("");
	const [sortKey, setSort] = useState("name");
	const [inverted, setInverted] = useState(true);
	const [pagination, setPagination] = useState(1);
	const [tags, setTags] = useState(null);
	const [genres, setGenres] = useState(null);
	const [platforms, setPlatforms] = useState(null);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadGenres("40");
			actions.loadPlatforms("50");
			if (props.location.state != undefined) {
				setGameName(props.location.state);
			}
		};
		loadSearch();
	}, []);
	useEffect(() => {
		let sort = "";
		const realSearch = () => {
			if (inverted == true) {
				sort = `-${sortKey}`;
			} else {
				sort = sortKey;
			}
			actions.loadSuperSearch(gameName, pagination, genres, tags, sort, platforms);
		};
		realSearch();
	}, [sortKey, pagination, inverted, tags, genres, platforms, gameName]);
	return (
		<Container fluid>
			<Row>
				<Row>
					<Col>
						{store.genres != null && (
							<ToggleButtonGroup value={genres} type="checkbox" className="mb-2">
								{store.genres.map((value, index) => {
									return (
										<ToggleButton
											key={index}
											onChange={
												genres == value.id ? e => setGenres(null) : e => setGenres(value.id)
											}
											value={value.id}
											variant="dark">
											{value.name}
										</ToggleButton>
									);
								})}
							</ToggleButtonGroup>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{store.tags != null && (
							<ToggleButtonGroup value={tags} type="checkbox" className="mb-2">
								{store.tags.map((value, index) => {
									return (
										<ToggleButton
											key={index}
											onChange={tags == value.id ? e => setTags(null) : e => setTags(value.id)}
											value={value.id}
											variant="dark">
											{value.name}
										</ToggleButton>
									);
								})}
							</ToggleButtonGroup>
						)}
					</Col>
				</Row>
				<Row>
					<Col>
						{store.platforms != null && (
							<ToggleButtonGroup value={platforms} type="checkbox" className="mb-2">
								{store.platforms.map((value, index) => {
									return (
										<ToggleButton
											key={index}
											value={value.id}
											variant="dark"
											onChange={
												genres == value.id
													? e => setPlatforms(null)
													: e => setPlatforms(value.id)
											}>
											{value.name}
										</ToggleButton>
									);
								})}
							</ToggleButtonGroup>
						)}
					</Col>
				</Row>
			</Row>
			<Row>
				<Col>
					<input
						type="text"
						className="form-control"
						onChange={event => setGameName(event.target.value)}
						placeholder="Search..."
						value={gameName}
						aria-haspopup="true"
						aria-expanded="false"
						style={{ width: "50em" }}
					/>
					{gameName != "" && <i className="fas fa-times float-right" onClick={e => setGameName("")} />}
				</Col>
				<Sorter setSort={setSort} sortKey={sortKey} setInverted={setInverted} inverted={inverted} />
			</Row>
			{store.superSearch[0] != undefined &&
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
