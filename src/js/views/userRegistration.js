import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export const UserRegistration = props => {
	const { store, actions } = useContext(Context);
	const [newUsername, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	let history = useHistory();
	const handleSubmit = e => {
		actions.registerUser(newUsername, newEmail, newPassword, history);
	};
	return (
		<Container className="space blue">
			<Row className="justify-content-center">
				<Col sm={11} md={8}>
					{store.errors.registerError == true && (
						<Alert className="marginError center" variant="danger">
							Please fill all fields.
						</Alert>
					)}
					<Container id="userForm" style={{ marginTop: "5rem" }} className="center">
						<h3 className="formTitle">Registration</h3>
						<Form className="search-margin">
							<Form.Row>
								<Form.Group as={Col} controlId="Username">
									<Form.Label className="input-space">Username</Form.Label>
									<Form.Control
										onChange={e => setNewUserName(e.target.value)}
										className="input-space input-shadow"
										type="text"
										placeholder="Username"
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="Email">
									<Form.Label className="input-space">Email</Form.Label>
									<Form.Control
										onChange={e => setNewEmail(e.target.value)}
										className="input-space input-shadow"
										type="email"
										placeholder="Email"
									/>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label className="input-space">Password</Form.Label>
									<Form.Control
										onChange={e => setNewPassword(e.target.value)}
										className="input-space input-shadow"
										type="password"
										placeholder="Password"
									/>
								</Form.Group>
							</Form.Row>

							<Button
								onClick={e => handleSubmit(e)}
								variant="success"
								className="input-space"
								type="button">
								Submit
							</Button>
						</Form>
					</Container>
					<div style={{ marginTop: "2rem" }} className="center">
						<a onClick={e => history.push("/login")} className="link">
							Already have an account?
						</a>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
