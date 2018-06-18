import { AppRegistry } from 'react-native';
import App from './App';
var Platform = require('Platform');
var running_on_android_tv = Platform.isTV;

new App();