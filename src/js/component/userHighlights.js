import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import {
	Carousel,
	Card,
	Container,
	Row,
	Col,
	Dropdown,
	DropdownButton,
	Button,
	Table,
	Tooltip,
	OverlayTrigger
} from "react-bootstrap";
export const UserHighlights = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const renderStarted = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you just started!
		</Tooltip>
	);
	const renderFinished = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you finished!
		</Tooltip>
	);
	const renderCompleted = props => (
		<Tooltip id="button-tooltip" {...props}>
			Games that you finished and completed all achivements/content!
		</Tooltip>
	);
	return (
		<Container>
			<Table className="center" style={{ width: "50rem" }}>
				<thead>
					<tr>
						<th>Platform</th>
						<th>
							<OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderStarted}>
								<span>Started</span>
							</OverlayTrigger>
						</th>
						<th>
							<OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderFinished}>
								<span>Finished</span>
							</OverlayTrigger>
						</th>
						<th>
							<OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderCompleted}>
								<span>Completed</span>
							</OverlayTrigger>
						</th>
					</tr>
				</thead>
				<tbody>
					{store.user.platforms.map((value, index) => {
						if (!!value) {
							if (!!value.platform_name) {
								if (index == 0) {
									return (
										<tr key={index}>
											<td>{value.platform_name}</td>
											{store.user.game_progression[0] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[0].game_id}`,
																state: store.user.game_progression[0].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[0].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[1] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[1].game_id}`,
																state: store.user.game_progression[1].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[1].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[2] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[2].game_id}`,
																state: store.user.game_progression[2].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[2].game_name}
													</span>
												</td>
											)}
										</tr>
									);
								}
								if (index == 1) {
									return (
										<tr key={index}>
											<td>{value.platform_name}</td>
											{store.user.game_progression[3] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[3].game_id}`,
																state: store.user.game_progression[3].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[3].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[4] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[4].game_id}`,
																state: store.user.game_progression[4].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[4].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[5] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[5].game_id}`,
																state: store.user.game_progression[5].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[5].game_name}
													</span>
												</td>
											)}
										</tr>
									);
								}
								if (index == 2) {
									return (
										<tr key={index}>
											<td>{value.platform_name}</td>
											{store.user.game_progression[6] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[6].game_id}`,
																state: store.user.game_progression[6].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[6].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[1] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[7].game_id}`,
																state: store.user.game_progression[7].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[7].game_name}
													</span>
												</td>
											)}
											{store.user.game_progression[8] != null && (
												<td>
													<span
														onClick={e =>
															history.push({
																pathname: `/details/${store.user.game_progression[8].game_id}`,
																state: store.user.game_progression[8].game_id
															})
														}
														style={{ cursor: "pointer" }}>
														{store.user.game_progression[8].game_name}
													</span>
												</td>
											)}
										</tr>
									);
								}
							}
						}
					})}
				</tbody>
			</Table>
		</Container>
	);
};
