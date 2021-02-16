import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Card, Container, Row, Col, Nav, Tab, Sonnet } from "react-bootstrap";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const GameDetails = props => {
	const { store, actions } = useContext(Context);
	actions.loadGame(props.location.state);

	return (
		<Container>
			<Jumbotron fluid className="text-dark">
				<Container>
					<div>
						<img src={store.game.background_image} alt="First slide" />
					</div>
					<h1>{store.game.name}</h1>
					<p>{store.game.description}</p>
				</Container>
			</Jumbotron>
			<Row>
				<Tab.Container defaultActiveKey="details">
					<Row>
						<Nav variant="pills" className="flex-column">
							<Row>
								<Nav.Item>
									<Nav.Link eventKey="details">Details</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="statistics">Statistic</Nav.Link>
								</Nav.Item>
							</Row>
						</Nav>
					</Row>
					<Row>
						<Col>
							<Tab.Content>
								<Tab.Pane eventKey="details">
									<Row>
										<Col>
											<div>
												<h1>Platforms</h1>
												{store.game.platforms.map((value, index) => {
													return value.platform.name;
												})}
											</div>
										</Col>
										<Col>
											<div>
												<h1>Platforms</h1>
												{props.location.state.platforms.map((value, index) => {
													return value.platform.name;
												})}
											</div>
										</Col>
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey="statistics">Lets go statistics</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Row>
		</Container>
	);
};

GameDetails.propTypes = {
	location: PropTypes.object
};
