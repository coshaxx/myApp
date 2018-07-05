import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import * as imageSizes from "../../constants/imageSizes";
import { getImageUrl } from "../../modules/_imageHelper";
import { styles } from "../../styles/poster.style";
import Loader from "../../components/Loader/loader"
import clientApi from '../../modules/_clientApi'
import colors from "../../styles/common.style";
import Icon from 'react-native-vector-icons/FontAwesome'

const  TVEventHandler = require('TVEventHandler');

export default class Poster extends Component {

    constructor() {
        super();
        this.state = {
            needLoader: false,
            poster: {},
        }


    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.film.title}`,
        headerLeft:
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name={'arrow-left'} size={20} style={{paddingLeft: 20}} color='#fff'/>
                    </TouchableOpacity>,
        headerStyle: {
            backgroundColor: colors.grey,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    });

    componentDidMount() {
        this._fetchPosterData();
        this._enableTVEventHandler();
    }


    componentWillUnmount() {
        console.log('UNMOUNT TVHANDLER')
        this._disableTVEventHandler();
    }

    _enableTVEventHandler() {
        const $this = this;
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, function(cmp, evt) {
            console.log('EVENT TYPE Poster Screen:', evt.eventType)
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
        this._disableTVEventHandler();
        console.log('  this._disableTVEventHandler();');
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
        console.log(' this.props.navigation:',  this.props.navigation.isFocused())

        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image source={{uri: imageUrl}} style={styles.posterImage}/>
                </View>
                <View style={styles.rightView}>
                    <Text style={[styles.text, styles.title]}>{film.title}</Text>
                    <View style={styles.detailInformationContainer}>
                        <Text style={styles.text}>Detail information:</Text>
                        <View>
                            {this.state.needLoader ? <Loader/> :
                                <View>
                                    <View style={styles.posterOverView}>
                                        <Text style={styles.text}>{poster.overview}</Text>
                                    </View>

                                    <Text style={styles.text}>Release Data: {poster.release_date}</Text>
                                    <Text style={styles.text}>Vote Average: {poster.vote_average}</Text>

                                    <TouchableOpacity style = {styles.buttonContainer}>
                                            <Icon.Button
                                                name='play'
                                                size={20}
                                                color={'#fff'}
                                                onPress={}
                                                backgroundColor={colors.focusColor}
                                                borderRadius={5}
                                                hasTVPreferredFocus ={true}>
                                                <Text style={{color:'#fff',marginLeft:5}}>Play Video</Text>
                                            </Icon.Button>


                                    </TouchableOpacity>
                                </View>
                                }
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}



