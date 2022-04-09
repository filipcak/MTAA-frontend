import { StyleSheet } from 'react-native'
 
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textStyleHome: {
      marginTop: 10,
      fontFamily: "Roboto",
      color: "#121212",
      fontSize: 15,
    },

    textStyleInfo: {     
        alignSelf: "center",
        fontFamily: "Roboto",
        color: "#121212",
        marginTop: 20,
      },
    textStyleTitle: {      
      alignSelf: "center",
      fontFamily: "Roboto",
      color: "#121212",
      fontSize: 35,
      marginTop: 10
    },
    
    inputView: {
      backgroundColor: "#00BFFF",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    textStyle: {
        textAlign: 'left',
        fontFamily: "Roboto",
        color: "#121212",
        left: "10%",
        marginTop: 20,
      },
    btnStyle: {
        alignSelf: 'center',
        width: "80%",
        borderRadius: 10,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#FFF",
    },
    btnHome: {
        alignSelf: 'center',
        width: "80%",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#00BFFF",
    },
    btnStyleRegLog: {
        alignSelf: 'center',
        width: "50%",
        borderRadius: 15,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#00BFFF",
    },
});