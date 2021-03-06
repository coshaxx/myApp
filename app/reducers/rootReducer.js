import { combineReducers } from 'redux';
import {
    createStackNavigator,
} from 'react-navigation';

import films from '../screens/Films/films.reducer'


import FilmsGrid from '../../app/screens/Films/filmsScreen'
import PosterWrapper from '../../app/screens/Poster/posterScreen'
import VideoPlayer from '../../app/screens/VideoPlayer/videoPlayer'
import {createNavigationReducer} from "react-navigation-redux-helpers";


export const AppNavigator = createStackNavigator({
        Home:FilmsGrid,
        FilmPoster:PosterWrapper,
        Video:VideoPlayer

    },
    {
        initialRouteName: 'Home',
    });

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
    nav: navReducer,
	films,
});

export default appReducer;
