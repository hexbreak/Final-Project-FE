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
	ToggleButtonGroup,
	ButtonGroup
} from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
import PropTypes from "prop-types";

export const SearchPage = props => {
	const { store, actions } = useContext(Context);
	const [gameName, setGameName] = useState(
		props.location.state.gameName != undefined && props.location.state != undefined
			? props.location.state.gameName
			: ""
	);
	const [sortKey, setSort] = useState(
		props.location.state.sort != undefined && props.location.state != undefined
			? props.location.state.sort
			: "metacritics"
	);
	const [inverted, setInverted] = useState(
		props.location.state.inverted != undefined && props.location.state != undefined
			? props.location.state.inverted
			: true
	);
	const [pagination, setPagination] = useState(1);
	const [tags, setTags] = useState(null);
	const [genres, setGenres] = useState(null);
	const [platforms, setPlatforms] = useState(null);
	const [showMorePlatforms, setShowMorePlatforms] = useState(false);
	const [showMoreTags, setShowMoreTags] = useState(false);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadGenres("40");
			actions.loadPlatforms("50");
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
		<Container
			fluid
			style={{
				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
				paddingBottom: "3rem"
			}}
			className="space center">
			<Row className="search-margin center">
				<Col>
					{store.genres != null && (
						<ToggleButtonGroup value={genres} type="checkbox" className="mb-2">
							{store.genres.map((value, index) => {
								return (
									<ToggleButton
										key={index}
										onChange={genres == value.id ? e => setGenres(null) : e => setGenres(value.id)}
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
			<Row className="search-margin center">
				<Col sm={10}>
					<Row>
						<Col>
							<input
								type="text"
								className="form-control center"
								onChange={event => setGameName(event.target.value)}
								placeholder="Search..."
								value={gameName}
								aria-haspopup="true"
								aria-expanded="false"
								style={{ width: "50em" }}
							/>
							{gameName != "" && (
								<i className="fas fa-times float-right" onClick={e => setGameName("")} />
							)}
						</Col>
					</Row>
					<Col className="search-margin search-box">
						<Row>
							<Col className="search-margin">
								<Sorter
									setSort={setSort}
									sortKey={sortKey}
									setInverted={setInverted}
									inverted={inverted}
									setPagination={setPagination}
								/>
							</Col>
						</Row>
						<Row className="search-margin">
							{store.superSearch[0] != undefined &&
								store.superSearch.map((value, index) => {
									return (
										<GameCard
											className="card"
											key={index}
											game={value}
											cleanSearch={e => setGameName("")}
										/>
									);
								})}
						</Row>
						{store.superSearch.length >= 20 && (
							<Row className="center search-margin">
								{pagination > 1 && (
									<Button
										style={{ marginBottom: "2rem" }}
										className="center"
										variant="success"
										onClick={e => setPagination(pagination - 1)}>
										Previous Page
									</Button>
								)}
								<Button
									style={{ marginBottom: "2rem" }}
									className="center"
									variant="success"
									onClick={e => setPagination(pagination + 1)}>
									Next Page
								</Button>
							</Row>
						)}
					</Col>
				</Col>
				<Col sm={2}>
					<Row>
						<Col className="search-margin">
							{store.tags != null && (
								<ButtonGroup value={tags} type="checkbox" className="mb-2" vertical>
									{store.tags.map((value, index) => {
										if (index <= 5 && showMoreTags == false) {
											return (
												<Button
													key={index}
													onClick={
														tags == value.id ? e => setTags(null) : e => setTags(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</Button>
											);
										} else if (showMoreTags == true) {
											return (
												<Button
													key={index}
													onClick={
														tags == value.id ? e => setTags(null) : e => setTags(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</Button>
											);
										}
									})}
									{showMoreTags == false ? (
										<Button id="viewmore" onClick={e => setShowMoreTags(true)}>
											Show More
										</Button>
									) : (
										<Button id="viewmore" onClick={e => setShowMoreTags(false)}>
											Show Less
										</Button>
									)}
								</ButtonGroup>
							)}
						</Col>
					</Row>
					<Row className="search-margin">
						<Col>
							{store.platforms != null && (
								<ButtonGroup value={platforms} type="checkbox" className="mb-2" vertical>
									{store.platforms.map((value, index) => {
										if (index <= 5 && showMorePlatforms == false) {
											return (
												<Button
													key={index}
													onClick={
														platforms == value.id
															? e => setPlatforms(null)
															: e => setPlatforms(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</Button>
											);
										} else if (showMorePlatforms == true) {
											return (
												<Button
													key={index}
													onClick={
														platforms == value.id
															? e => setPlatforms(null)
															: e => setPlatforms(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</Button>
											);
										}
									})}
									{showMorePlatforms == false ? (
										<Button id="viewmore" onClick={e => setShowMorePlatforms(true)}>
											Show More
										</Button>
									) : (
										<Button id="viewmore" onClick={e => setShowMorePlatforms(false)}>
											Show Less
										</Button>
									)}
								</ButtonGroup>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

SearchPage.propTypes = {
	location: PropTypes.object
};
