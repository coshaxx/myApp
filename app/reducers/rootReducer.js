import { combineReducers } from 'redux';
import {
    createStackNavigator,
} from 'react-navigation';

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
        mode: 'modal'
    });

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
    nav: navReducer,
	films,
});

export default appReducer;
