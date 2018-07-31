import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as filmsAction from './films.actions'
import * as imageSizes from '../../constants/imageSizes'
import { ITEM_HEIGHT, ITEM_WIDTH, numColumns, PRODUCT_ITEM_MARGIN, styles } from "../../styles/films.style";
import {Text, View, Image, ActivityIndicator, FlatList, TouchableHighlight, Button} from 'react-native';
import {getImageUrl} from "../../modules/_imageHelper";
import Loader from "../../components/Loader/loader"
import colors from '../../styles/common.style'
import FlatItem from "../../components/FlatItem/flatItem";




class FilmsGrid extends Component {
    constructor() {
        super();

        this.onPress = this.onPress.bind(this);
    }

    static navigationOptions = {
        title: 'Films',
        headerStyle: {
            backgroundColor: colors.grey,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        this.props.actions.fetchPopularFilms();
    }

    componentWillUpdate() {

        const {routes, index} = this.props.nav;
        const currentIndex = routes[index].routeName;

        this.renderFlatList = currentIndex === 'Home';
    }


    onPress = (film) => {
        this.props.navigation.navigate('FilmPoster', {
            film: film,
        });
    }


    _renderItem = ({item, separators}) => {
        const imageUrl = getImageUrl(item.poster_path, imageSizes.IMAGE_SIZE_370_556);
        return <FlatItem
            item={item}
            imageUrl={imageUrl}
            onPress = {this.onPress}
            separators={separators}
            key={item.id}
        />
    }

    _loadMore = () => {
        if (!this.props.needLoader) {
            this.props.actions.startFetchFilms();
            this.props.actions.fetchPopularFilms(this.props.currentPagePopular + 1)
            this.props.actions.fetchTopFilms(this.props.currentPageTop + 1)
        }
    }

    _keyExtractor = (item, index) => item.id.toString();

    _getItemLayout = (data, index) => {
        const productHeight = ITEM_HEIGHT;
        const ROW_HEIGHT = ITEM_WIDTH + PRODUCT_ITEM_MARGIN*2
        // console.log("product Height:", productHeight, 'offset', productHeight * index);
        // console.log("offset:", productHeight * index);
        return {
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index,
        };
    };


    handleScroll =  function(event: Object) {
    console.log('scrollPosition:',event.nativeEvent.contentOffset.y );
}

    renderSeparator = function () {
        return <View style={{width:2}}>{}</View>
    }

    render() {
        const {films, needLoader, error} = this.props;
        console.log("render FilmsScreen");
        return (
            error.message.length ? <View>
                    <Text> Error:</Text>
                    <Text> {error.message}</Text>
                </View> :
                <View style={styles.container}>
                    {needLoader && films.length === 0 ?
                        <Loader horyzontal/>
                        :
                        <View style={styles.flatContainer}>
                            {this.renderFlatList ?
                                < FlatList
                                horizontal
                                data={films}
                                renderItem={this._renderItem}
                                onEndReached={this._loadMore}
                                contentcontaierStyle={styles.container}
                                keyExtractor={this._keyExtractor}
                                // getItemLayout={this._getItemLayout}
                                onScroll={this.handleScroll}
                                ItemSeparatorComponent={this.renderSeparator}
                                />


                                : null
                            }
                            < FlatList
                                horizontal
                                data={films}
                                renderItem={this._renderItem}
                                onEndReached={this._loadMore}
                                contentcontaierStyle={styles.container}
                                keyExtractor={this._keyExtractor}
                                // getItemLayout={this._getItemLayout}
                                onScroll={this.handleScroll}
                                ItemSeparatorComponent={this.renderSeparator}
                            />

                                </View>
                    }
                </View>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        films: state.films.popular.results,
        needLoader: state.films.loading,
        error: state.films.error,
        currentPagePopular: state.films.popular.page,
        currentPageTop: state.films.top.page,
        nav: state.nav,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(filmsAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsGrid)
