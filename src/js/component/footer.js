import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Row, Col } from "react-bootstrap";
export const Footer = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	return (
		<footer className="footer mt-auto py-3 text-center bg-white">
			<Row>
				<Col>
					<p>
						Made with <i className="fa fa-heart text-danger" /> by
						<a href="http://www.4geeksacademy.com"> Regem Ludus</a>
					</p>
				</Col>
				{store.id <= 0 && (
					<>
						<Col id="middleLine"></Col>
						<Col>
							<p>
								<a onClick={e => history.push("/registration")} className="link">
									Sign Up
								</a>{" "}
								or{" "}
								<a onClick={e => history.push("/login")} className="link">
									Log In
								</a>{" "}
								to get better comprehensive experience and more!
							</p>
						</Col>
					</>
				)}
			</Row>
		</footer>
	);
};
