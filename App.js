import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import ComponentText from './app/components/ComponentText/ComponentText'
import Component4 from "./app/components/Component4/Component4";
import Component5 from "./app/components/Component5/Component5";
import Component6 from "./app/components/Component6/Component6";
import { Navigation } from 'react-native-navigation';
import {registerScreens} from "./screens";

export default class MyApp {
    constructor(){

        registerScreens();

        MyApp.startApp('my.Component5', 'Welcome')
    }

    static startApp (screen, title, params) {
        Navigation.startSingleScreenApp({
            screen: {
                screen: screen,
                label: title,
            },
            passProps: {},
            appStyle: {
                orientation: 'portrait',
                keepStyleAcrossPush: true
            }
        });
    }

}


