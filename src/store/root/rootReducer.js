// third party
import { combineReducers } from "redux";

// application
import version from '@/store/version'


export default combineReducers({
    version: (state = version) => state
})