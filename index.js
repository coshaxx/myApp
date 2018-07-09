import { AppRegistry } from 'react-native';
import MyApp from './App';

console.disableYellowBox = true;

var Platform = require('Platform');
var running_on_android_tv = Platform.isTV;

AppRegistry.registerComponent('MyApp', () => MyApp);