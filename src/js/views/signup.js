import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const Login = () => {
    const { store, actions } = useContext(Context);
    let history = useHistory();

    return (
        <div className="container">
            {/* handles, emails, passwords to login. history hook to push user directly onto the profile page */}
        </div>
    )
}
