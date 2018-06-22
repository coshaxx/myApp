import React, { Component } from 'react';
import {View, ActivityIndicator} from 'react-native'
import styles from './loader.style';
import colors from '../../styles/common.style'

export default class Loader extends Component {

    render() {
        const {horizontal = false, color = ''} = this.props;
        return <View style={horizontal? [styles.container, styles.horizontal] : styles.container}>
            <ActivityIndicator size="large" color={colors.focusColor}/>
        </View>
    }

}