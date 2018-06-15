import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as albumsActions from './../Albums/albums.actions'

class Component6 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }
    }

    componentDidMount() {
        console.log("compoNN::-------------", this.state);
        const { user } = this.state;
        console.log("THIS PROPS:", this.props);
        this.props.actions.fetchUserAlbums(user.id)
    }


    render() {
        const {user} = this.state;
        const { needLoader, albums } = this.props;
        return (
            <View>
                <Text>Details:</Text>
                <View>
                    <Text> Name: {user.name}</Text>
                    <Text> Username: {user.username}</Text>
                    <Text> Email: {user.email}</Text>
                </View>
                {needLoader ?
                    <View>
                        <ActivityIndicator size="large" color="#00ffaa"/>
                    </View>
                    :
                    <FlatList style={styles.container}
                        data = { albums}
                              renderItem={({item}) => <Text>{item.title}</Text>}
                    />
                }
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
});

function mapStateToProps(state, ownProps) {
    return {
        albums: state.albums.data,
        needLoader: state.albums.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(albumsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component6)
