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
							if (!!value.name) {
								return (
									<tr key={index}>
										<td>{value.name}</td>
										{store.user.game_progression[index] != null && (
											<td>
												<span
													onClick={e =>
														history.push({
															pathname: `/details/${store.user.game_progression[index][0].id}`,
															state: store.user.game_progression[index][0].id
														})
													}
													style={{ cursor: "pointer" }}>
													{store.user.game_progression[index][0].name}
												</span>
											</td>
										)}
										{store.user.game_progression[index][1] != null && (
											<td>
												<span
													onClick={e =>
														history.push({
															pathname: `/details/${store.user.game_progression[index][1].id}`,
															state: store.user.game_progression[index][1].id
														})
													}
													style={{ cursor: "pointer" }}>
													{store.user.game_progression[index][1].name}
												</span>
											</td>
										)}
										{store.user.game_progression[index][2] != null && (
											<td>
												<span
													onClick={e =>
														history.push({
															pathname: `/details/${store.user.game_progression[index][2].id}`,
															state: store.user.game_progression[index][2].id
														})
													}
													style={{ cursor: "pointer" }}>
													{store.user.game_progression[index][2].name}
												</span>
											</td>
										)}
									</tr>
								);
							}
						}
					})}
				</tbody>
			</Table>
		</Container>
	);
};
