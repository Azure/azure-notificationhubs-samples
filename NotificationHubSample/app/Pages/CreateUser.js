import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { color, min } from 'react-native-reanimated';

import { useDispatch } from 'react-redux';
import { createUser, getUsers } from '../data/reducers/user-management.reducer';

import styles from '../Styles/styles';

const CreateUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    try {
      setLoading(true);
      let res = await dispatch(createUser(userInfo));
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Error fetching data', res.error.message, [
          { text: 'Okay' },
        ]);
      } else {
        dispatch(getUsers());
        navigation.navigate('Users');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error fetching data', error.message, [{ text: 'Okay' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LocalStyles.backgroundPage}>
      <View style={LocalStyles.container}>
        <View
          style={{
            position: 'absolute',
            width: loading === true ? '100%' : 0,
            height: loading === true ? '100%' : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            zIndex: 99,
            opacity: 0.6,
          }}>
          <ActivityIndicator size="large" animating={loading} color="#000000" />
        </View>
        <Text style={LocalStyles.titleCreateUser}>Create User</Text>
        <Text style={LocalStyles.text}>Username:</Text>
        <TextInput style={LocalStyles.textbox}
          onChangeText={(val) => {
            setUserInfo({ ...userInfo, username: val });
          }} />
        <Text style={LocalStyles.text}>Email:</Text>
        <TextInput style={LocalStyles.textbox}
          onChangeText={(val) => {
            setUserInfo({ ...userInfo, email: val });
          }} />
        <Text style={LocalStyles.text}>Password:</Text>
        <TextInput style={LocalStyles.textbox} secureTextEntry={true} onChangeText={(val) => {
          setUserInfo({ ...userInfo, password: val });
        }} />
        <View style={LocalStyles.buttonView}>
          <Button title="Submit"
            onPress={(e) => { addUser(); }}
          />
        </View>
      </View>

    </View>
  );
};

export default CreateUser;

CreateUser.propTypes = {
  zoomEnabled: PropTypes.bool
};

const LocalStyles = StyleSheet.create({
  container: {
    height: 410,
    width: 500,
    position: 'absolute',
    backgroundColor: '#7553A9',
    padding: '1%',
    borderColor: 'black',
    borderWidth: 0.5,
    margin: '30%',
    marginTop: '10%',
    marginBottom: '5%',
    borderRadius: 2,
  },
  text: {
    color: '#FFFFFF',
    alignItems: 'flex-start',
    width: 91,
    height: 17,
    fontSize: 13,
    marginTop: '5%',
  },
  textbox:
  {
    backgroundColor: '#644693',
    alignItems: 'flex-start',
    textAlignVertical: 'auto',
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#431A81',
    marginTop: '3%',

  },
  backgroundPage: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    opacity: 0.95,
    height: '100%',
    width: '100%',
  },
  buttonView: {
    width: 100,
    marginTop: '5%',
    borderRadius: 1,
    color: '#FFFFFF',
  },
  titleCreateUser: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    width: 140,
    height: 27,
  }
});
