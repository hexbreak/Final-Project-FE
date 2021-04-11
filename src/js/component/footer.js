import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Row, Col } from "react-bootstrap";
export const Footer = () => {
	const { store, actions } = useContext(Context);
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
								<a href="/registration">Sign Up</a> or <a href="/login">Log In</a> to get better
								comprehensive experience and more!
							</p>
						</Col>
					</>
				)}
			</Row>
		</footer>
	);
};
