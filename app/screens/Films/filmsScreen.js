import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as filmsAction from './films.actions'
import * as imageSizes from '../../constants/imageSizes'
import {ITEM_HEIGHT, numColumns, PRODUCT_ITEM_MARGIN, styles} from "../../styles/films.style";
import {Text, View, Image, ActivityIndicator, FlatList, TouchableHighlight} from 'react-native';
import {getImageUrl} from "../../modules/_imageHelper";
import Loader from "../../components/Loader/loader"
import colors from '../../styles/common.style'

class FilmsGrid extends Component {
    constructor() {
        super();
        this.state = {
            selectedId: null
        }
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

    _setSelectedId = (id) => {
        // updater functions are preferred for transactional updates
        this.setState(() => {
            return {selectedId: id};
        });
    };


    onPress(film) {
        this.props.navigation.push('FilmPoster', {
            film: film,
        });
    }

    componentDidBlur(){
        console.log('DID BLUER')
    }


    _renderItem = ({item}) => {
        const imageUrl = getImageUrl(item.poster_path, imageSizes.IMAGE_SIZE_370_556);
        const isSelected = item.id === this.state.selectedId;
        return <TouchableHighlight key={item.id}
                                   onPress={() => this.onPress(item)}
                                   underlayColor={colors.focusColor}
                                   onShowUnderlay={() => this._setSelectedId(item.id)}
        >

            <View style={[styles.itemWrap, isSelected && styles.itemWrapActive]}>
                <View style={[styles.imageWrap, isSelected && styles.imageWrapActive]}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                </View>
                <View style={[styles.imageFooterContainer, isSelected && styles.imageFooterContainerActive]}>
                    <Text
                        style={[styles.footerText, styles.footerTitle, isSelected && styles.footerTextActive]}>{item.title}</Text>
                    <View style={styles.footerRatingBlock}>
                        <Text
                            style={[styles.footerText, styles.footerData, isSelected && styles.footerDataActive]}>{item.release_date}</Text>
                        <Text
                            style={[styles.footerText, isSelected && styles.footerTextActive]}>Rating: {item.vote_average}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    }

    _loadMore = () => {
        if (!this.props.needLoader) {
            this.props.actions.startFetchFilms();
            this.props.actions.fetchPopularFilms(this.props.currentPage + 1)
        }
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
                <View style={styles.container}>
                    {needLoader && films.length === 0 ?
                        <Loader horyzontal/>
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
                                ItemSeparatorComponent={({highlighted}) => (
                                    <View style={[highlighted && {marginLeft: 40, padding: 0}]}/>
                                )}
                            />
                        </View>
                    }
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
