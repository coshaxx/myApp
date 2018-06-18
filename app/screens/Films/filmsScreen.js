import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filmsAction from './films.actions'
import * as imageSizes from '../../constants/imageSizes'
import { ITEM_HEIGHT, numColumns, PRODUCT_ITEM_MARGIN, styles } from "../../styles/films.style";
import { Text, View, Image, ActivityIndicator, FlatList, TouchableWithoutFeedback } from 'react-native';
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

        return <TouchableWithoutFeedback key={item.id} onPress={() => console.log("PRESS on val", item.id)}>
        <View style={styles.imageWrap}>
            <Image source={{uri:imageUrl}}  style={styles.image}/>
            <Text >{item.title}</Text>
        </View>
        </TouchableWithoutFeedback>
    }

    _loadMore = () => {
        this.props.actions.fetchPopularFilms(this.props.currentPage + 1)
    }

    _keyExtractor = (item, index) => item.id;

    _getItemLayout = (data, index) => {
        const productHeight = ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };
    render() {
        const {films, needLoader, error} = this.props;
        console.log("STYLES:", styles);

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
                             numColumns={numColumns}
                            keyExtractor={this._keyExtractor}
                            getItemLayout={this._getItemLayout}
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
