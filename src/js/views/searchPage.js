import React, { useState, useEffect, useContext, useCallback } from "react";
import { Container, Row, Col, Button, ToggleButton, ToggleButtonGroup, Spinner } from "react-bootstrap";
import { Context } from "../store/appContext";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
import { debounce } from "lodash";
import { SearchPageDropdown } from "../component/searchPageDropdown";
import PropTypes from "prop-types";

export const SearchPage = props => {
	const { store, actions } = useContext(Context);
	const [gameName, setGameName] = useState(
		props.location.state == undefined
			? ""
			: props.location.state.gameName == undefined
			? ""
			: props.location.state.gameName
	);
	const [sortKey, setSort] = useState(
		props.location.state == undefined
			? "metacritic"
			: props.location.state.sort == undefined
			? "metacritic"
			: props.location.state.sort
	);
	const [inverted, setInverted] = useState(
		props.location.state == undefined
			? true
			: props.location.state.inverted == undefined
			? true
			: props.location.state.inverted
	);
	const realSearch = searchBar => {
		let sort = "";
		if (inverted == true) {
			sort = `-${sortKey}`;
		} else {
			sort = sortKey;
		}
		if (!!searchBar) {
			actions.loadSuperSearch(searchBar, pagination, genres, tags, sort, platforms);
		} else {
			actions.loadSuperSearch(gameName, pagination, genres, tags, sort, platforms);
		}
	};
	const [pagination, setPagination] = useState(1);
	const [tags, setTags] = useState(null);
	const [genres, setGenres] = useState(null);
	const [platforms, setPlatforms] = useState(null);
	const [showMorePlatforms, setShowMorePlatforms] = useState(false);
	const [showMoreTags, setShowMoreTags] = useState(false);
	const [showMoreGenres, setShowMoreGenres] = useState(false);
	useEffect(() => {
		const loadSearch = () => {
			actions.loadTags("40");
			actions.loadGenres("40");
			actions.loadPlatforms("50");
		};
		loadSearch();
	}, []);
	const debouncedSave = useCallback(
		debounce(nextValue => realSearch(nextValue), 250),
		[]
	);
	const handleChange = event => {
		const { value: nextValue } = event.target;
		setGameName(nextValue);
		debouncedSave(nextValue);
	};
	useEffect(() => {
		realSearch();
	}, [sortKey, pagination, inverted, tags, genres, platforms]);

	const handlePagination = debounce(value => {
		setPagination(value);
	}, 250);
	return (
		<Container
			fluid
			style={{
				background: "radial-gradient(circle, rgba(174,238,205,1) 0%, rgba(148,187,233,1) 100%)",
				paddingBottom: "3rem"
			}}
			className="space center">
			<Row className="search-margin center screen-xl">
				<Col className="col-12">
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
			<Row className="screen-medium-off">
				<SearchPageDropdown setTags={setTags} setGenres={setGenres} setPlatforms={setPlatforms} />
			</Row>
			<Row className="search-margin center">
				<Col>
					<Row className="justify-content-center">
						<Col className="col-11">
							<input
								type="text"
								className="form-control"
								onChange={handleChange}
								placeholder="Search..."
								value={gameName}
								aria-haspopup="true"
								aria-expanded="false"
								style={{ width: "100%" }}
							/>
							{gameName != "" && <i className="fas fa-times search-x" onClick={e => setGameName("")} />}
						</Col>
					</Row>
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
					<Col className="search-margin search-box">
						{store.loading.searchLoading == true ? (
							<Row>
								<Col>
									<div className="center">
										<Spinner animation="border" variant="secondary" />
									</div>
								</Col>
							</Row>
						) : (
							<Row className="search-margin">
								{store.superSearch[0] != undefined &&
									store.superSearch.map((value, index) => {
										return (
											<Col className="col-12" md={4} lg={3} key={index}>
												<GameCard
													className="card"
													size={"bigCard"}
													game={value}
													id={"user-games-card"}
													cleanSearch={e => setGameName("")}
												/>
											</Col>
										);
									})}
							</Row>
						)}
						{store.superSearch.length >= 20 && (
							<Row className="center search-margin">
								{pagination > 1 && (
									<Button
										style={{ marginBottom: "2rem" }}
										className="center"
										variant="success"
										onClick={e => handlePagination(pagination - 1)}>
										Previous Page
									</Button>
								)}
								<Button
									style={{ marginBottom: "2rem" }}
									className="center"
									variant="success"
									onClick={e => handlePagination(pagination + 1)}>
									Next Page
								</Button>
							</Row>
						)}
					</Col>
				</Col>
				<Col className="screen-medium col-3">
					<Row className="screen-medium-xl">
						<Col className="search-margin">
							{store.genres != null && (
								<ToggleButtonGroup value={genres} type="checkbox" className="mb-2" vertical>
									{store.genres.map((value, index) => {
										if (index <= 5 && showMoreTags == false) {
											return (
												<ToggleButton
													key={index}
													onChange={
														genres == value.id
															? e => setGenres(null)
															: e => setGenres(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
											);
										} else if (showMoreGenres == true) {
											return (
												<ToggleButton
													key={index}
													onChange={
														genres == value.id
															? e => setGenres(null)
															: e => setGenres(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
											);
										}
									})}
									{showMoreGenres == false ? (
										<Button id="viewmore" onClick={e => setShowMoreGenres(true)}>
											Show More
										</Button>
									) : (
										<Button id="viewmore" onClick={e => setShowMoreGenres(false)}>
											Show Less
										</Button>
									)}
								</ToggleButtonGroup>
							)}
						</Col>
					</Row>
					<Row>
						<Col className="search-margin">
							{store.tags != null && (
								<ToggleButtonGroup value={tags} type="checkbox" className="mb-2" vertical>
									{store.tags.map((value, index) => {
										if (index <= 5 && showMoreTags == false) {
											return (
												<ToggleButton
													key={index}
													onChange={
														tags == value.id ? e => setTags(null) : e => setTags(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
											);
										} else if (showMoreTags == true) {
											return (
												<ToggleButton
													key={index}
													onChange={
														tags == value.id ? e => setTags(null) : e => setTags(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
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
								</ToggleButtonGroup>
							)}
						</Col>
					</Row>
					<Row className="search-margin">
						<Col>
							{store.platforms != null && (
								<ToggleButtonGroup value={platforms} type="checkbox" className="mb-2" vertical>
									{store.platforms.map((value, index) => {
										if (index <= 5 && showMorePlatforms == false) {
											return (
												<ToggleButton
													key={index}
													onChange={
														platforms == value.id
															? e => setPlatforms(null)
															: e => setPlatforms(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
											);
										} else if (showMorePlatforms == true) {
											return (
												<ToggleButton
													key={index}
													onChange={
														platforms == value.id
															? e => setPlatforms(null)
															: e => setPlatforms(value.id)
													}
													value={value.id}
													variant="dark">
													{value.name}
												</ToggleButton>
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
								</ToggleButtonGroup>
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
