import { combineReducers } from 'redux';
import {
    createStackNavigator,
} from 'react-navigation';
import users from '../components/Users/users.reducer';
import albums from '../components/Albums/albums.reducer';
import films from '../screens/Films/films.reducer'


import FilmsGrid from '../../app/screens/Films/filmsScreen'
import Poster from '../../app/screens/Poster/posterScreen'
import VideoPlayer from '../../app/screens/VideoPlayer/videoPlayer'
import {createNavigationReducer} from "react-navigation-redux-helpers";


export const AppNavigator = createStackNavigator({
        Home:FilmsGrid,
        FilmPoster:Poster,
        Video:VideoPlayer

    },
    {
        initialRouteName: 'Home',
    });

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
    nav: navReducer,
	users,
	albums,
	films,
});

export default appReducer;
