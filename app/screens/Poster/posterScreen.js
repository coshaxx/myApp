import React, { Component } from 'react';
import { Text, View, Image, Button } from 'react-native';
import * as imageSizes from "../../constants/imageSizes";
import { getImageUrl } from "../../modules/_imageHelper";
import { styles } from "../../styles/poster.style";
import Loader from "../../components/Loader/loader"
import clientApi from '../../modules/_clientApi'

const  TVEventHandler = require('TVEventHandler');

export default class Poster extends Component {

    constructor() {
        super();
        this.state = {
            needLoader: false,
            poster: {},
        }

    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this._fetchPosterData();
        this._enableTVEventHandler();
    }

    componentWillUnmount() {
        this._disableTVEventHandler();
    }

    _enableTVEventHandler() {
        const $this = this;
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, function(cmp, evt) {
            console.log('EVENT TYPE:', evt.eventType)
            if(evt){
                switch (evt.eventType){
                    case 'playPause':$this._onPress();break;
                    case 'menu': $this.props.navigation.goBack();break;
                }
            }

        });
    }

    _disableTVEventHandler() {
        if (this._tvEventHandler) {
            this._tvEventHandler.disable();
            delete this._tvEventHandler;
        }
    }

    _fetchPosterData() {
        const { navigation } = this.props;
        const film = navigation.getParam('film', 'NO-ID');

        const api = clientApi();
        api.getPosterData(film.id)
            .then(response => {
                this.setState({
                    needLoader: false,
                    poster: {...response.data}
                })
            })
            .catch(error => {
                console.log("error:", error.message)
            })
    }

    _onPress = () => {
        this.props.navigation.navigate('Video',{
                video: this.state.poster.id,
                headerMode: 'screen'
        });
    }

    render() {

        const { navigation } = this.props;
        const film = navigation.getParam('film', 'NO-ID');
        const {poster} = this.state;
        const imageUrl = getImageUrl(film.poster_path, imageSizes.IMAGE_SIZE_370_556);

        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image source={{uri: imageUrl}} style={styles.posterImage}/>
                </View>
                <View style={styles.rightView}>
                    <Text style={[styles.text, styles.title]}>{film.title}</Text>
                    <Text style={styles.text}>Detail information:</Text>
                    <View style={styles.detailInformationContainer}>
                        <View>
                            {this.state.needLoader ? <Loader/> :
                                <View>
                                    <View style={styles.posterOverView}>
                                        <Text style={styles.text}>{poster.overview}</Text>
                                    </View>

                                    <Text style={styles.text}>Release Data: {poster.release_date}</Text>
                                    <Text style={styles.text}>Vote Average: {poster.vote_average}</Text>

                                    <View style = {styles.buttonContainer}>
                                        <Button
                                            onPress={this._onPress}
                                            title={"Play Video"}
                                            hasTVPreferredFocus ={true}
                                            color={'#fff'}
                                        />
                                    </View>
                                </View>
                                }
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}



