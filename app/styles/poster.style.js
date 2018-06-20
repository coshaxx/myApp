import { StyleSheet } from 'react-native'
import colors from './common.style'
export const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor:colors.grey,
    },
    leftView:{
        flex:1,
        width:30,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
    },
    posterImage:{
        width: 250,
        height: 400,
    },
    rightView:{
        flex: 2,
        marginLeft:10,
        padding:5,
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    detailInformationContainer:{
        flex:1,
        justifyContent: 'flex-start'
    },
    posterOverView:{
        marginBottom:20,
        marginTop:20,
    },
    text:{
        color: colors.textColor
    },
    title:{
        fontSize: 18,
    },
    buttonContainer:{
        width:140,
        marginTop:20
    }
})