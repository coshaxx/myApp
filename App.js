import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from "./screens";
import configureStore from './app/store/configureStore'

const store = configureStore();
export default class MyApp {
    constructor() {

        registerScreens(store, Provider);

        MyApp.startApp('screen.films', 'Welcome')
    }

    static startApp(screen, title, params) {
        Navigation.startSingleScreenApp({
            screen: {
                screen: screen,
                label: title,
            },
            passProps: {},
            appStyle: {
                orientation: 'landscape',
                keepStyleAcrossPush: true
            }
        });
    }

}


