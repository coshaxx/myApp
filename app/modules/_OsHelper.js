import {Platform} from "react-native";

export default appleOrAndroid = (AppleValue, AndroidValue) => {
    return Platform.OS === 'ios'? AppleValue : AndroidValue;
}