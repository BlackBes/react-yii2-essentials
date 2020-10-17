import {SET_AUTH_TOKENS, SET_USER_NAME} from "../actions/actionTypes";
const IS_DEV = true;
const startAddress = 'http://';
let cleanAddress = '';

if(!IS_DEV) {
    cleanAddress = '';
} else {
    cleanAddress = 'localhost:8080';
}

const initialState = {
    authToken: '2cxQpMzXwAQ9lP4xAp_G8afOYBy5Ogjq',
    userName: '',
    address:  startAddress+cleanAddress+'/api',
    cleanAddress: startAddress+cleanAddress,
    screen: '1'
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS:
            localStorage.setItem("tokens", action.data);
            return {
                ...state,
                authToken: action.data
            };
        case SET_USER_NAME:
            localStorage.setItem("userName", action.data);
            return {
                ...state,
                userName: action.data
            };
        default:
            return state;
    }
};

export default api;
