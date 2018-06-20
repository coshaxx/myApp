import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableOpacity} from 'react-native';
import * as imageSizes from "../../constants/imageSizes";
import { getImageUrl } from "../../modules/_imageHelper";
import { styles } from "../../styles/poster.style";
import Loader from "../../components/Loader/loader"
import clientApi from '../../modules/_clientApi'

export default class Poster extends Component {
    constructor() {
        super();
        this.state = {
            needLoader: false,
            poster: {},
        }
    }

    componentDidMount() {
        this._fetchPosterData();
    }

    _fetchPosterData() {
        const api = clientApi();
        api.getPosterData(this.props.film.id)
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
        this.props.navigator.push({
            screen: 'screen.videoPlayer',
            title: 'Detail page',
            passProps: {
                video: this.state.poster.id
            }
        });
        console.log("Press Play Video:", this.state.poster.id);
    }

    render() {
        const {film} = this.props;
        const {poster} = this.state;
        const imageUrl = getImageUrl(film.poster_path, imageSizes.IMAGE_SIZE_370_556);
        console.log("this.props.film:", this.props.film);
        console.log("POSTER:", this.state);
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


