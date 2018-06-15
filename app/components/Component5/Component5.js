import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { styles} from "./Component5.styles";
import * as userActions from '../Users/users.actions'
import { Text, View, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';

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
        const {users} = this.props;
        return (
            this.props.needLoader ?
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ffaa"/>
            </View>
                :
            <View>
                <Text>Users:</Text>
                <ListView
                    dataSource={this.state.userDataSource.cloneWithRows(users)}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.users.data,
        needLoader: state.users.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component5)
