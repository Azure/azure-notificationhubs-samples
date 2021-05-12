import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
      width: '80%',
      height: '100%',
      margin: 80
    },
    container2: {
      flex: 1,
      backgroundColor: '#f44',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      flex: 1,
      color: '#000',    
      borderColor: '#00f',
      padding: 10,            
    },
    list:
    {
      flex: 1,
      padding: 10,        
      alignItems: 'stretch',
      borderColor: '#00f',
      backgroundColor: '#444',
    },
    text: {
      flex: 1,          
      alignItems: 'center',   
    }, 
    textInputStyle: {
      marginTop: 16,
      width:"90%",
      color: "black",
      backgroundColor: "white",
      borderColor: "gray",
      borderWidth: 1
    },
    centerChildren: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    verticalCenterChildren: {
      display: 'flex',
      alignItems: 'center'
    },
    horizontalCenterChildren: {
      display: 'flex',
      justifyContent: 'center'
    }
  });