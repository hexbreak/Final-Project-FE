import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { debounce } from "lodash";
import { GameCarousel } from "../component/gameCarousel";
import { GameCard } from "../component/gameCard";
import { Sorter } from "../component/sorter";
export const Home = () => {
	const { store, actions } = useContext(Context);
	const [sortKey, setSort] = useState("name");
	const [inverted, setInverted] = useState(false);
	const [pagination, setPagination] = useState(1);
	let history = useHistory();
	const handleViewMore = viewMore => {
		viewMore;
		window.scrollTo(0, 0);
	};
	const handlePagination = debounce(value => {
		setPagination(value);
	}, 250);
	useEffect(() => {
		actions.loadGameList(1);
		actions.loadLists(1);
	}, []);
	useEffect(() => {
		let sort = "";
		if (inverted == true) {
			sort = `-${sortKey}`;
		} else {
			sort = sortKey;
		}
		actions.loadSortedGameList(pagination, sort);
	}, [sortKey, pagination, inverted]);
	if (store.sortedGameList[0] != undefined) {
		if (store.sortedGameList[0].name != undefined) {
			return (
				<>
					<Container fluid>
						<Row className="row-carrousel" style={{ marginTop: "45px" }}>
							<Col className="row justify-content-md-center">
								<GameCarousel />
							</Col>
						</Row>
						<Container fluid className="white">
							<Row style={{ marginTop: "2rem" }} className="spacing">
								<Col style={{ marginTop: "2rem" }} className="center">
									<h2 className="subtitle center">Sortable Games</h2>
									<div className="center content">
										<Sorter
											setSort={setSort}
											sortKey={sortKey}
											setInverted={setInverted}
											inverted={inverted}
											setPagination={setPagination}
										/>
									</div>
									{store.loading.homeLoading == true ? (
										<Row>
											<Col>
												<div className="center">
													<Spinner animation="border" variant="secondary" />
												</div>
											</Col>
										</Row>
									) : (
										<Row className="scroller fit center" style={{ marginTop: "1rem" }}>
											{store.sortedGameList.map((value, index) => {
												return (
													<div className="col-6 col-md-3" key={index}>
														<GameCard className="card" size={"bigCard"} game={value} />
													</div>
												);
											})}
										</Row>
									)}
									<Row className="center search-margin screen-medium-off">
										{pagination > 1 && (
											<Col>
												<Button
													className="center"
													variant="success"
													onClick={e => handlePagination(pagination - 1)}>
													Previous
												</Button>
											</Col>
										)}
										<Col>
											<Button
												className="center"
												variant="success"
												onClick={e => handlePagination(pagination + 1)}>
												Next
											</Button>
										</Col>
									</Row>
									<Row className="center search-margin screen-medium-off">
										<Button
											className="center"
											variant="success"
											onClick={e =>
												handleViewMore(
													history.push({
														pathname: "/search",
														state: {
															sort: sortKey,
															pagination: pagination,
															inverted: inverted
														}
													})
												)
											}>
											View More
										</Button>
									</Row>
									<Row className=" search-margin screen-medium screen-medium-flex justify-content-between">
										{pagination > 1 && (
											<Col className="col-4">
												<Button
													variant="success"
													onClick={e => handlePagination(pagination - 1)}>
													Previous Page
												</Button>
											</Col>
										)}
										<Col className="col-4">
											<Button
												variant="success"
												onClick={e =>
													handleViewMore(
														history.push({
															pathname: "/search",
															state: {
																sort: sortKey,
																pagination: pagination,
																inverted: inverted
															}
														})
													)
												}>
												View More
											</Button>
										</Col>
										<Col className="col-4">
											<Button variant="success" onClick={e => handlePagination(pagination + 1)}>
												Next Page
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row fluid className="spacing">
								<Col>
									<h2 className="subtitle center">Metacritic Rating</h2>
									<Row className="scroller fit center content">
										{store.gameMetacriticList.map((value, index) => {
											return (
												<div className="col-6 col-md-3" key={index}>
													<GameCard className="card" size={"bigCard"} game={value} />
												</div>
											);
										})}
									</Row>
									<Row className="center search-margin">
										<Col className="col-12">
											<Button
												className="center"
												variant="success"
												onClick={e =>
													handleViewMore(
														history.push({
															pathname: "/search",
															state: { sort: "metacritic" }
														})
													)
												}>
												View More
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row className="space" style={{ marginTop: "10rem" }}>
								<Col>
									<h2 className="subtitle center">User Rating</h2>
									<Row className="scroller fit center" style={{ marginTop: "3rem" }}>
										{store.gameRatingList.map((value, index) => {
											return (
												<div className="col-6 col-md-3" key={index}>
													<GameCard className="card" size={"bigCard"} game={value} />
												</div>
											);
										})}
									</Row>
									<Row className="center">
										<Col className="col-12">
											<Button
												className="center search-margin"
												variant="success"
												onClick={e =>
													handleViewMore(
														history.push({ pathname: "/search", state: { sort: "rating" } })
													)
												}>
												View More
											</Button>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</Container>
				</>
			);
		} else {
			return (
				<Container>
					<Row>
						<Col>
							<div className="center">
								<Spinner animation="border" variant="secondary" />
							</div>
						</Col>
					</Row>
				</Container>
			);
		}
	} else {
		return (
			<Container>
				<Row>
					<Col>
						<div className="center">
							<Spinner animation="border" variant="secondary" />
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
};
