import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filmsAction from './films.actions'
import * as imageSizes from '../../constants/imageSizes'
import { styles} from "../../styles/films.style";
import { Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import { getImageUrl} from "../../modules/_imageHelper";

class FilmsGrid extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.actions.fetchPopularFilms();
    }


    onPress(user) {
        // this.props.navigator.push({
        //     screen: 'my.Component6',
        //     title: 'Detail page',
        //     passProps: {
        //         user: user
        //     }
        // });
    }


    _renderItem = ({item}) =>{
        const imageUrl = getImageUrl(item.poster_path, imageSizes.IMAGE_SIZE_350_196);

        return <View key={item.id} style={styles.itemView}>
            <Image source={{uri:imageUrl}}  style={{width: 100, height: 196}}/>
            <Text >{item.title}</Text>
        </View>
    }

    _loadMore = () => {
        this.props.actions.fetchPopularFilms(this.props.currentPage + 1)
    }


    render() {
        const {films, needLoader, error} = this.props;
        return (
            error.message.length ? <View>
                    <Text> Error:</Text>
                    <Text> {error.message}</Text>
                </View> :
                needLoader ?
                    <View>
                        <ActivityIndicator size="large" color="#00ffaa"/>
                    </View>
                    :
                    <View>
                        <FlatList
                            data={films}
                            renderItem={this._renderItem}
                            onEndReached={this._loadMore}
                            contentcontaierStyle={styles.container}
                        />
                        <Text> Hello wold!2 </Text>
                    </View>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        films: state.films.data.results,
        needLoader: state.films.loading,
        error: state.films.error,
        currentPage: state.films.data.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(filmsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsGrid)
