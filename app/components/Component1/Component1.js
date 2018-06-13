import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';

export default class Component1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Dima',
            message: props.message,
            countElements: 0
        }
    }

    static defaultProps = {
        message: 'Default message'
    };

    onPress() {
        console.log('Area Pressed');
    }

    onPressOpacity() {
        console.log('Area 2 Pressed')
    }

    render() {
        return (
            <View>
                <Text style={styles.text}> {this.state.message} </Text>
                <View style={styles.container}>
                    <TouchableHighlight onPress={this.onPress} style={styles.v1} underlayColor="blue">
                        <View>
                            <Text>View 1</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableOpacity
                        onPress={this.onPressOpacity}
                        style={styles.v2}>
                        <View>
                            <Text>View 2</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.v3}>
                        <Text style={styles.vText}>View 3</Text>
                    </View>
                </View>
                <Text>{this.state.countElements}</Text>
            </View>


        )

    }
}
const styles = StyleSheet.create({
    text: {
        color: 'white',
        backgroundColor: 'blue'
    },
    container: {
        flexDirection: 'row',
        height: 100
    },
    v1: {
        flex: 1,
        backgroundColor: 'green',
        padding: 10
    },
    v2: {
        flex: 1,
        backgroundColor: 'yellow',
        padding: 10
    },
    v3: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10
    },
    vText: {
        color: 'white'
    }

});
AppRegistry.registerComponent('Component1', () => Component1);
