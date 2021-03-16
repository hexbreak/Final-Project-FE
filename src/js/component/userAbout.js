import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Carousel, Card, Container, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap";
export const UserAbout = () => {
	const { store, actions } = useContext(Context);
	return <div className="about-me">{store.user[0].about}</div>;
};
