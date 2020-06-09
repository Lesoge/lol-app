import axios from "axios";

import {
    GET_ERRORS,
    SET_CURRENT_PLAYER,
    PLAYER_LOADING
} from "./types";

export const loadLolacc = req => dispatch => {
    axios
        .get("http://localhost:8000/riotapi/lolacc", req)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const loadRankedstats = req => dispatch => {
    console.log(req.body)
    axios
        .get("http://localhost:8000/riotapi/rankedstats", req)
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data}));
}


