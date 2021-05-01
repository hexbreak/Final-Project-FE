import React, { useContext } from "react";
import { Context } from "../store/appContext";
export const UserAbout = () => {
	const { store, actions } = useContext(Context);
	return <div className="about-me">{store.user.about}</div>;
};
