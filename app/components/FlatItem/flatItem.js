import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image,
    Text,
    Animated,
    Easing
} from 'react-native'
import colors from '../../styles/common.style'
import { styles } from "../../styles/films.style";

export default class FlatItem extends Component {

    _defaultMinScale = 1;
    _defaultMaxScale = 1.1;


    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            _rowOpacity: new Animated.Value(0),
            _scaleValue: new Animated.Value(this._defaultMinScale)
        };


    }

    componentDidMount() {


    }

    scaleUpDown(isUp = true) {
        Animated.timing(
            this.state._scaleValue,
            {
                toValue: isUp ? this._defaultMaxScale : this._defaultMinScale,
                duration: 150,
                useNativeDriver: true

            }
        ).start(() => console.log("end animation"), this._setSelectedId(this.props.item.id));
    }


    _setSelectedId() {
        this.setState(() => {
            return {isActive: true}
        })
    }

    _unsetSelectedId() {
        this.setState(() => {
            return {isActive: false}
        })
    }

    handleOnPress = () => {
        this.props.onPress(this.props.item)
    }

    handleOnShowUnderlay = () => {
        this.scaleUpDown();
    }

    handleOnHideUnderlay = () => {
        this.scaleUpDown(false);
        this._unsetSelectedId()
    }


    render() {
        const {isActive} = this.state;
        const {item, imageUrl, separators} = this.props;



        return <TouchableWithoutFeedback
            onPress={this.handleOnPress}
            underlayColor={colors.backgroundColor}
            onPressIn={this.handleOnShowUnderlay}
            onShowUnderlay={this.handleOnShowUnderlay}
            onPressOut={this.handleOnHideUnderlay}
            onHideUnderlay={this.handleOnHideUnderlay}
        >

            <Animated.View style={[styles.itemWrap, {
                transform: [
                    {scale: this.state._scaleValue}
                ]
            }]}>
                <View style={[styles.imageWrap]}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                </View>
                <View style={[styles.imageFooterContainer]}>
                     <Text
                        style={[styles.footerText, styles.footerTitle]}>{item.title}</Text>
                    <View style={styles.footerRatingBlock}>
                        <Text
                            style={[styles.footerText, styles.footerData]}>{item.release_date}</Text>
                        <Text
                            style={[styles.footerText]}>Rating: {item.vote_average}</Text>
                    </View>

                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    }

}