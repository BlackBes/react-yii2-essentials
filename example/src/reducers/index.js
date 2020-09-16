import {combineReducers} from "redux";
import api from './api';
import breadcrumbs from './breadcrumbs';

export default combineReducers({
    api,
    breadcrumbs
});