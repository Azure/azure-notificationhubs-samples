import PropTypes from 'prop-types';
import React from 'react';
import {    
    View,
    Text,      
  } from 'react-native';

import styles from '../Styles/styles';

//const SettingsScreen = function () {
// function SettingsScreen(){
    export default class SettingsScreen extends React.Component {
        render() {
    return (
      <View style={styles.container}>
         <Text style={styles.Text}>Create User Page</Text>
      </View>
    );
  }
    }

    SettingsScreen.propTypes = {
        zoomEnabled: PropTypes.bool
      };
//   module.export=SettingsScreen;