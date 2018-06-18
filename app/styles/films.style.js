import { Dimensions, StyleSheet, Platform } from 'react-native'

export const { width, height } = Dimensions.get('window');


export const numColumns = 4;

export const ITEM_OFFSET = 5;
export const PRODUCT_ITEM_MARGIN = ITEM_OFFSET * 2;

export const ITEM_HEIGHT = (Dimensions.get('window').height/3) - ITEM_OFFSET * 3;
export const ITEM_WIDTH = (Dimensions.get('window').width/numColumns) - ITEM_OFFSET * numColumns;
export const IMAGE_HEIGHT = 125;

const colors = {
    snow: 'white',
    darkPurple: '#140034',
    placeholder: '#eee',
};

export const styles = {
    container:{
      flex:1,
      alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#eee'
    },
    imageWrap:{
        margin:PRODUCT_ITEM_MARGIN,
        padding:ITEM_OFFSET,
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor:'#fff'
    },
    image:{
        width: ITEM_WIDTH,
        height: IMAGE_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
}
