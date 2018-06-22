import { Dimensions, StyleSheet, Platform } from 'react-native'
import colors from './common.style'
import appleOrAndroid from '../modules/_OsHelper';
export const { width, height } = Dimensions.get('window');

export const numColumns = 4;

export const ITEM_OFFSET = 5;
export const PRODUCT_ITEM_MARGIN = ITEM_OFFSET * 2;

export const ITEM_HEIGHT = (Dimensions.get('window').height/3) - ITEM_OFFSET * 3;
export const ITEM_WIDTH = (Dimensions.get('window').width/numColumns) - ITEM_OFFSET * numColumns;
export const IMAGE_HEIGHT = appleOrAndroid(250,125);


export const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: colors.backgroundColor
    },
    imageWrap:{
        margin:PRODUCT_ITEM_MARGIN,
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: colors.grey,
    },
    image:{
        width: ITEM_WIDTH,
        height: IMAGE_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageFooterContainer:{
        flex:1,
        padding:5
    },
    footerText:{
        fontSize: appleOrAndroid(28,10),
        color: colors.textColor
    },
    footerTitle:{
        fontSize: appleOrAndroid(32,12),
        flex:1
    },
    footerData:{
      fontSize:appleOrAndroid(28,12),
        marginRight:appleOrAndroid(20,10)
    },
    footerRatingBlock:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center'
    }
})
