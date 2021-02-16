import React from "react";
import { Link } from "react-router-dom";

export const UserBacklog = () => {
	return (
		<table className="table table-dark">
			<thead>
				<tr>
					<th scope="col">Platform</th>
					<th scope="col">New</th>
					<th scope="col">Finshed</th>
					<th scope="col">Completed</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Platform Name</th>
					<td>New Title Count #</td>
					<td>New Title Count #</td>
					<td>New Title Count #</td>
				</tr>
				<tr>
					<th scope="row">Platform Name</th>
					<td>Finished Title Count #</td>
					<td>Finished Title Count #</td>
					<td>Finished Title Count #</td>
				</tr>
				<tr>
					<th scope="row">Platform Name</th>
					<td>Completed Title Count #</td>
					<td>Completed Title Count #</td>
					<td>Completed Title Count #</td>
				</tr>
			</tbody>
		</table>
	);
};
