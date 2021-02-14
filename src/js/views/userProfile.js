import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const userProfile = () => {
    return (
        <div className="container">
            <div className="h1 text-center">H1, Profile Page Header.</div>
            <div className="text-center">test two here!</div>
        </div>
    );
};