import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import configureStore from './app/store/configureStore'
import {reduxifyNavigator} from "react-navigation-redux-helpers";
import {AppNavigator} from "./app/reducers/rootReducer";

const store = configureStore();
console.log('-------------------------222---------------------------')
const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default class MyApp extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }


}


