import {
    SET_AUTH_TOKENS, SET_BREADCRUMBS, SET_USER_NAME
} from "./actionTypes";

export const setAuthTokens = (data) => ({
    type: SET_AUTH_TOKENS,
    data: data
});

export const setUserName = (data) => ({
    type: SET_USER_NAME,
    data: data
});

export const setBreadcrumbs = (data) => ({
    type: SET_BREADCRUMBS,
    data: data
});


