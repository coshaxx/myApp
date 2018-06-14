import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../Users/users.actions'
import { Text, View, ListView, StyleSheet, TouchableHighlight } from 'react-native';

class Component5 extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            userDataSource: ds
        }
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
    }


    onPress(user) {
        console.log('USER:', user);

        this.props.navigator.push({
            screen: 'my.Component6',
            title: 'Detail page',
            passProps: {
                user: user
            }
        });
    }

    renderRow(user, sectionId, rowId, highlightRow) {
        console.log("USER:", user);
        return (
            <TouchableHighlight onPress={() => this.onPress(user)}>
                <View style={styles.row}>
                    <Text style={styles.rowText}>{user.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        console.log("USERS:", this.props.users);
        const { users } = this.props;
        return (
            <View>
                <Text>Users:</Text>
                <ListView
                    dataSource = {this.state.userDataSource.cloneWithRows(users)}
                    renderRow = { this.renderRow.bind(this)}
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

function mapStateToProps(state, ownProps) {
    return {
        users: state.users.data,
        loading: state.users.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component5)
