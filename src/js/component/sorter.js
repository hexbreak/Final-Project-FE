import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownButton, Button, Modal } from "react-bootstrap";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
export const Sorter = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSort = sorted => {
		props.setSort(sorted);
		props.setPagination(1);
	};
	return (
		<Container>
			<Row>
				<Col className="col-12" md={6}>
					<Row>
						<Col className="col-6">
							<Button
								id="ascendingbtn"
								variant="primary"
								className="btn-fontsize"
								style={{ width: "100%", margin: "1rem 0" }}
								onClick={
									props.inverted == false
										? e => props.setInverted(true)
										: e => props.setInverted(false)
								}>
								{props.inverted == false ? (
									<i className="fas fa-sort-up btn-fontsize" />
								) : (
									<i className="fas fa-sort-down btn-fontsize" />
								)}
							</Button>
						</Col>
						<Col className="col-6">
							<Button
								id="toggletags"
								variant="secondary"
								className="btn-fontsize"
								style={{ width: "100%" }}
								onClick={store.id > 0 ? e => actions.changePreference() : () => handleShow()}>
								{store.preference == false ? (
									<i className="fas fa-chess-pawn btn-fontsize" />
								) : (
									<i className="fas fa-chess-king btn-fontsize" />
								)}
							</Button>
							<Modal show={show} onHide={handleClose}>
								<Modal.Header closeButton></Modal.Header>
								<p className="center login-modal">
									Please{" "}
									<a onClick={e => history.push("/login")} className="link">
										login
									</a>{" "}
									or{" "}
									<a onClick={e => history.push("/registration")} className="link">
										register
									</a>{" "}
									to use this tool!
								</p>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>
						</Col>
					</Row>
				</Col>
				<Col md={6} className="col-12">
					<DropdownButton
						className="center btn-fontsize btn-font"
						variant="success"
						style={{ margin: "1rem 0" }}
						title={props.sortKey.charAt(0).toUpperCase() + props.sortKey.slice(1)}>
						<Dropdown.Item variant="dark" onClick={e => handleSort("name")}>
							Name
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("released")}>
							Released
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("added")}>
							Added
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("created")}>
							Created
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("updated")}>
							Updated
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("rating")}>
							Rating
						</Dropdown.Item>
						<Dropdown.Item variant="dark" onClick={e => handleSort("metacritic")}>
							Metacritic
						</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
		</Container>
	);
};
Sorter.propTypes = {
	setSort: PropTypes.func,
	setInverted: PropTypes.func,
	inverted: PropTypes.bool,
	sortKey: PropTypes.string,
	setPagination: PropTypes.func
};
