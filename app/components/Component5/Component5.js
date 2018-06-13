import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight } from 'react-native';

export default class Component5 extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            userDataSource: ds
        }
    }
    componentDidMount() {
        this.fetchUsers();
    }

    onPress(user) {
        console.log('USER:', user);

        console.log("this.props.navigator", this.props.navigator.push({
            screen: 'my.Component6',
            title: 'Detail page'
        }));
    }

    renderRow(user, sectionId, rowId, highlightRow) {
        return (
            <TouchableHighlight onPress={() => this.onPress(user)}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    fetchUsers() {
        console.log('SEND RESPONSE');
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    userDataSource: this.state.userDataSource.cloneWithRows(response)
                })
            })
    }

    render() {
        return (
            <View>
                <Text>ListView:</Text>
                <ListView
                    dataSource={this.state.userDataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f4f4f4',
        marginBottom: 3
    },
    rowText: {
        flex: 1
    }
});
// AppRegistry.registerComponent('Component5', () => Component5);
