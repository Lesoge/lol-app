import {
	SET_CURRENT_PLAYER,
	PLAYER_LOADING
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	player: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_PLAYER:
		return {
			...state,
			isAuthenticated: !isEmpty(action.payload),
			player: action.payload
		};
		case PLAYER_LOADING:
		return {
			...state,
			loading: true
		};
		default:
		return state;
	}
}