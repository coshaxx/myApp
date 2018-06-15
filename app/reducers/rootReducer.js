import { combineReducers } from 'redux';
import users from '../components/Users/users.reducer';
import albums from '../components/Albums/albums.reducer';

const rootReducer = combineReducers({
	users,
	albums
});

export default rootReducer;
