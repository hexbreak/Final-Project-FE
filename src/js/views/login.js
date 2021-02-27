import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    let history = useHistory();

    return (
        <div className="container">
            {/* History hook to push torwards login in after signup */}
        </div>
    )
}