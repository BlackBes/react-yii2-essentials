import {SET_BREADCRUMBS} from "../actions/actionTypes";

const initialState = {
    breadcrumbs : []
};

const breadcrumbs = (state = initialState, action) => {
    switch (action.type) {
        case SET_BREADCRUMBS: {
            return {
                ...state,
                breadcrumbs: action.data
            };
        }
        default:
            return state;
    }
};

export default breadcrumbs;