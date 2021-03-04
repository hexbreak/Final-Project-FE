import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button, Table } from "react-bootstrap";
export const UserBacklog = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	return (
		<Container>
			<h6>Highlights</h6>
			<Table striped bordered hover variant="dark" style={{ width: "50rem" }}>
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
						return (
							<tr key={index}>
								<td>{value.name}</td>
								{store.user.game_progression[value.id].started != null && (
									<td>
										<span
											onClick={e =>
												history.push({
													pathname: `/details/${
														store.user.game_progression[value.id].started.id
													}`,
													state: store.user.game_progression[value.id].started.id
												})
											}
											style={{ cursor: "pointer" }}>
											{store.user.game_progression[value.id].started.name}
										</span>
									</td>
								)}
								{store.user.game_progression[value.id].finished != null && (
									<td>
										<span
											onClick={e =>
												history.push({
													pathname: `/details/${
														store.user.game_progression[value.id].finished.id
													}`,
													state: store.user.game_progression[value.id].finished.id
												})
											}
											style={{ cursor: "pointer" }}>
											{store.user.game_progression[value.id].finished.name}
										</span>
									</td>
								)}
								{store.user.game_progression[value.id].completed != null && (
									<td>
										<span
											onClick={e =>
												history.push({
													pathname: `/details/${
														store.user.game_progression[value.id].completed.id
													}`,
													state: store.user.game_progression[value.id].completed.id
												})
											}
											style={{ cursor: "pointer" }}>
											{store.user.game_progression[value.id].completed.name}
										</span>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Container>
	);
};
