import { combineReducers } from 'redux';
import users from '../components/Users/users.reducer';
import albums from '../components/Albums/albums.reducer';
import films from '../screens/Films/films.reducer'
const rootReducer = combineReducers({
	users,
	albums,
	films
});

export default rootReducer;
