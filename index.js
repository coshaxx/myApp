import { AppRegistry } from 'react-native';
import MyApp from './App';

var Platform = require('Platform');
var running_on_android_tv = Platform.isTV;

AppRegistry.registerComponent('MyApp', () => MyApp);