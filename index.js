import { AppRegistry } from 'react-native';
import App from './App';
var Platform = require('Platform');
var running_on_android_tv = Platform.isTV;

var running_on_apple_tv = Platform.isTVOS;
new App();