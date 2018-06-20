import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native'
import styles from './loader.style';

export default class Loader extends Component {

    render() {
        const {horizontal = false, color = ''} = this.props;
        return <View style={horizontal? [styles.container, styles.horizontal] : styles.container}>
            <ActivityIndicator size="large" color='#c80e00'/>
        </View>
    }

}