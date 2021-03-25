import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button, Table } from "react-bootstrap";
export const UserHighlights = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	return (
		<Container>
			<Table style={{ width: "50rem" }}>
				<thead>
					<tr>
						<th>Platform</th>
						<th>Started</th>
						<th>Finished</th>
						<th>Completed</th>
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
																pathname: `/details/${store.user.game_progression[0].id}`,
																state: store.user.game_progression[0].id
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
																pathname: `/details/${store.user.game_progression[1].id}`,
																state: store.user.game_progression[1].id
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
																pathname: `/details/${store.user.game_progression[2].id}`,
																state: store.user.game_progression[2].id
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
																pathname: `/details/${store.user.game_progression[3].id}`,
																state: store.user.game_progression[3].id
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
																pathname: `/details/${store.user.game_progression[4].id}`,
																state: store.user.game_progression[4].id
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
																pathname: `/details/${store.user.game_progression[5].id}`,
																state: store.user.game_progression[5].id
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
																pathname: `/details/${store.user.game_progression[6].id}`,
																state: store.user.game_progression[6].id
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
																pathname: `/details/${store.user.game_progression[7].id}`,
																state: store.user.game_progression[7].id
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
																pathname: `/details/${store.user.game_progression[8].id}`,
																state: store.user.game_progression[8].id
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
