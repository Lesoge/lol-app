import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
	GET_ERRORS,
	SET_CURRENT_PLAYER,
	PLAYER_LOADING
} from "./types";

// Register Player
export const registerPlayer = (playerData, history) => dispatch => {
	axios
      .post("http://localhost:8000/api/player/register", playerData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
      );
};

// Login - get player token
export const loginPlayer = playerData => dispatch => {
	axios
      .post("http://localhost:8000/api/player/login", playerData)
      .then(res => {
		// Save to localStorage
		// Set token to localStorage
		const { token } = res.data;
		localStorage.setItem("jwtToken", token);
		// Set token to Auth header
		setAuthToken(token);
		// Decode token to get player data
		const decoded = jwt_decode(token);
		// Set current player
		dispatch(setCurrentPlayer(decoded));
      })
      .catch(err =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
      );
};

// Set logged in player
export const setCurrentPlayer = decoded => {
	return {
		type: SET_CURRENT_PLAYER,
		payload: decoded
	};
};

// Player loading
export const setPlayerLoading = () => {
	return {
		type: PLAYER_LOADING
	};
};

// Log player out
export const logoutPlayer = () => dispatch => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current player to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentPlayer({}));
};


