import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    parent: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        margin: 10,
        width: "100%",
        height: "100%",
    },
    left: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    right: {
        flex:1,
        backgroundColor: "#F7F7FB",
        padding: 16,
    }
})

export default styles