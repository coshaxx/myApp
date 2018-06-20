import { Navigation } from 'react-native-navigation';

import Component5 from './app/components/Component5/Component5'
import Component6 from './app/components/Component6/Component6'
import FilmsGrid from './app/screens/Films/filmsScreen'
import Poster from './app/screens/Poster/posterScreen'
import VideoPlayer from './app/screens/VideoPlayer/videoPlayer'

export function registerScreens(store, Provider) {
    Navigation.registerComponent('my.Component5', () => Component5, store, Provider);
    Navigation.registerComponent('my.Component6', () => Component6, store, Provider);
    Navigation.registerComponent('screen.films', () => FilmsGrid, store, Provider);
    Navigation.registerComponent('screen.poster', () => Poster, store, Provider);
    Navigation.registerComponent('screen.videoPlayer', () => VideoPlayer, store, Provider);


}