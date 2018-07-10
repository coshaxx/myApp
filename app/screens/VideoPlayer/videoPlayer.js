import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video';

const TVEventHandler = require('TVEventHandler');
import Slider from 'react-native-slider';

export default class VideoPlayer extends Component {
    _tvEventHandler: any;

    state = {
        rate: 1,
        volume: 0.2,
        muted: true,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };

    video: Video;
    slider: Slider;

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this._enableTVEventHandler();
    }

    componentWillUnmount() {
        this._disableTVEventHandler();
    }

    _enableTVEventHandler() {
        const $this = this;
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, function (cmp, evt) {
            console.log('EVNT Player:', evt.eventType);

            if (evt) {
                switch (evt.eventType) {
                    case 'playPause':
                        $this.playPause();
                        break;

                    case 'menu':
                        $this._goBack();
                        break;

                    case 'left':
                    case 'rewind':
                        $this.rewindFastForfard(false);
                        break;

                    case 'right':
                    case 'fastForward':
                        $this.rewindFastForfard();
                        break;

                    case 'up':
                        $this.moveUpVolume();
                        break;
                    case 'down':
                        $this.moveDownVolume();
                        break;

                    case 'select':
                        $this.playPause();
                        break;
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

    rewindFastForfard = (direction = true) => {
        const {currentTime, duration} = this.state;
        const delta = 10;
        let position = direction ? currentTime + delta : currentTime - delta;
        if (position < 0) {
            position = 0
        }
        if (position > duration) {
            position = duration
        }

        this.moveVideoTo(position);
    };

    _goBack = () => {
        this.props.navigation.goBack()
    };

    fastForward = () => {
        const {currentTime} = this.state;
        let position = currentTime - 10;
        if (position < 0) {
            position = 0
        }

        this.moveVideoTo(position);
    }

    moveVideoTo = (position) => {
        this.video.seek(position)
    };

    moveUpVolume = () => {
        const volume = this.state.volume + 0.2 > 1 ? 1 : this.state.volume + 0.2;
        this.setState({
            muted: false,
            volume
        })
    };
    moveDownVolume = () => {
        const volume = this.state.volume - 0.2 < 0 ? 0 : this.state.volume - 0.2;

        this.setState({
            volume,
            muted: volume === 0

        })
    };
    muteUnmute = () => {
        this.setState({muted: !this.state.muted})
    };

    playPause = () => {
        this.setState({paused: !this.state.paused})
    };

    onLoad = (data) => {
        this.setState({duration: data.duration});
    };

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
    };

    onEnd = () => {
        this.setState({paused: true});
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                console.log('test')
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({volume, muted: false})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    _getVolumeIconName = () => {
        let icon = 'volume-off';

        if (this.state.muted) {
            icon = 'volume-off';
        } else if (!this.state.muted && this.state.volume > 0.5) {
            icon = 'volume-up'
        } else {
            icon = 'volume-down'
        }
        console.log('muted:', this.state.muted, 'volume:', this.state.volume, 'icon:', icon);
        return icon;
    };


    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        const player =
            <Video
                ref={(ref: Video) => {
                    this.video = ref
                }}
                source={require('./../../src/videos/example.mp4')}
                style={styles.fullScreen}
                rate={this.state.rate}
                paused={this.state.paused}
                volume={this.state.volume}
                muted={this.state.muted}
                resizeMode={this.state.resizeMode}
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                onAudioFocusChanged={this.onAudioFocusChanged}
                repeat={false}
            />


        return (

            <View style={styles.container}>

                {Platform.OS === 'ios' ?
                    [player]
                    :
                    <TouchableOpacity
                        style={styles.fullScreen}
                        onPress={this.playPause}
                    >
                        player
                    </TouchableOpacity>

                }

                {this.state.paused ?
                    <View style={styles.playButton}>
                        <Icon name='play' size={70} color="#fff"/>
                    </View>
                    :
                    null
                }

                <View style={styles.controls}>
                    <View style={styles.generalControls}>

                        <View style={[styles.resizeModeControl, styles.littleModeControl]}>
                            <View style={styles.playButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => this.playPause()}>
                                    <Icon name={this.state.paused ? 'play' : 'pause'} size={20} color="#cccccc"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.containerSlider}>
                            <Slider
                                value={this.state.currentTime}
                                maximumValue={this.state.duration}
                                onValueChange={(value) => (
                                    this.moveVideoTo(value)
                                )}/>
                        </View>
                        <View style={[styles.resizeModeControl, styles.littleModeControl]}>
                            <TouchableOpacity
                                onPress={() => this.muteUnmute()}>
                                <Icon name={this._getVolumeIconName()} size={20} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.2)}
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                        </View>

                        <View style={[styles.resizeModeControl]}>

                            <Icon.Button name='arrow-left' size={20} color={'#fff'}
                                         backgroundColor={'#2C2C2C'}
                                         onPress={() => this._goBack}>
                                Go Back</Icon.Button>

                        </View>

                    </View>

                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    containerSlider: {
        flex: 6,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        // backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 5,
        backgroundColor: '#2C2C2C',
        alignItems: 'center'
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    playControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    littleModeControl: {
        flex: 0.5
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    playButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
});