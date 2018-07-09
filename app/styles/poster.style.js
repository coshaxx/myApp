import { StyleSheet } from 'react-native'
import colors from './common.style'
import appleOrAndroid from '../modules/_OsHelper';
export const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor:colors.grey,
    },
    leftView:{
        flex:1,
        width: appleOrAndroid(60,30),
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: appleOrAndroid(40,20),
    },
    posterImage:{
        width: appleOrAndroid(500,250),
        height: appleOrAndroid(800,400),
    },
    rightView:{
        flex: 2,
        marginLeft:10,
        padding:5,
        justifyContent: 'flex-start',
        paddingTop: appleOrAndroid(40,20),
    },
    detailInformationContainer:{
        flex:1,
        justifyContent: 'flex-start',
        paddingTop: appleOrAndroid(40,20)
    },
    posterOverView:{
        marginBottom:appleOrAndroid(40,20),
        marginTop:appleOrAndroid(20,10),
    },
    text:{
        color: colors.textColor,
        fontSize: appleOrAndroid(20, 12)
    },
    title:{
        fontSize: appleOrAndroid(32,18),
    },
    buttonContainer:{
        width:appleOrAndroid(280,140),
        marginTop:appleOrAndroid(40,20),
        backgroundColor:colors.unFocusColor,
        borderRadius:5
    },
    buttonContainerActive:{
        backgroundColor:colors.focusColor,
    },
    button:{
        color:'#fff'
    }
})