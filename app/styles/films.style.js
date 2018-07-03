import {Dimensions, StyleSheet, Platform} from 'react-native'
import colors from './common.style'
import appleOrAndroid from '../modules/_OsHelper';

export const {width, height} = Dimensions.get('window');

export const numColumns = 4;

export const ITEM_OFFSET = 5;
export const PRODUCT_ITEM_MARGIN = ITEM_OFFSET * 2;

export const ITEM_HEIGHT = (Dimensions.get('window').height / 1.5) - ITEM_OFFSET * 3;
export const ITEM_WIDTH = ((Dimensions.get('window').width / numColumns) - ITEM_OFFSET * numColumns);
const ITEM_FOOTER_HEIGHT = 40;
export const IMAGE_HEIGHT = appleOrAndroid((ITEM_HEIGHT - ITEM_FOOTER_HEIGHT) * 2, ITEM_HEIGHT - ITEM_FOOTER_HEIGHT);


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: colors.backgroundColor
    },
    itemWrap: {
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: colors.grey,
        margin: PRODUCT_ITEM_MARGIN,
        flex: 1,
        flexDirection: 'column',
    },
    itemWrapActive: {
        margin: 0,
        height: ITEM_HEIGHT + PRODUCT_ITEM_MARGIN * 2,
        width: ITEM_WIDTH + PRODUCT_ITEM_MARGIN * 2
    },
    imageWrap: {
        height: IMAGE_HEIGHT,
        width: ITEM_WIDTH,
    },
    imageWrapActive: {
        width: ITEM_WIDTH + PRODUCT_ITEM_MARGIN * 2
    },
    image: {
        flex: 1,
    },
    imageFooterContainer: {
        padding: 5,
        height: ITEM_FOOTER_HEIGHT,
        justifyContent: 'flex-start',
    },
    imageFooterContainerActive:{
      height:  ITEM_FOOTER_HEIGHT + PRODUCT_ITEM_MARGIN * 2,
        backgroundColor: colors.focusColor
    },
    footerText: {
        fontSize: appleOrAndroid(28, 10),
        color: colors.textColor
    },
    footerTextActive:{
            fontSize: appleOrAndroid(30, 15),
            color: colors.textColor
    },
    footerTitle: {
        fontSize: appleOrAndroid(32, 12),
        flex: 1
    },
    footerTitleActive: {
        fontSize: appleOrAndroid(34, 14),
        flex: 1
    },
    footerData: {
        fontSize: appleOrAndroid(28, 12),
        marginRight: appleOrAndroid(20, 10)
    },
    footerDataActive: {
        fontSize: appleOrAndroid(30, 14),
        marginRight: appleOrAndroid(20, 10)
    },
    footerRatingBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
