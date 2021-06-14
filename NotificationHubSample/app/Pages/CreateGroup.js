import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import styles from '../Styles/styles';

import { useDispatch } from 'react-redux';
import {
  createSurveyGroup,
  getSurveyGroups,
} from '../data/reducers/group-management.reducer';

const CreateGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const addGroup = async () => {
    try {
      setLoading(true);
      let res = await dispatch(createSurveyGroup(groupInfo));
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Error adding group', res.error.message, [
          { text: 'Okay' },
        ]);
      } else {
        dispatch(getSurveyGroups());
        navigation.navigate('Groups');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error adding group', error.message, [{ text: 'Ok' }]);
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
        <Text style={LocalStyles.titleCreateGroup}>Create Group</Text>
        <Text style={LocalStyles.text}>Survey Group Name:</Text>
        <TextInput
          style={LocalStyles.textbox}
          onChangeText={(val) => {
            setGroupInfo({ ...groupInfo, groupName: val });
          }}
        />
        <View style={LocalStyles.buttonView}>
          <Button
            style={LocalStyles.btnSubmit}
            title="Create"
            onPress={(e) => {
              addGroup();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateGroup;

const LocalStyles = StyleSheet.create({
  container: {
    width: 500,
    backgroundColor: '#7553A9',
    padding: '1%',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 2,
    marginTop: '20%'
  },
  text: {
    color: '#FFFFFF',
    alignItems: 'flex-start',
    width: 91,
    height: 17,
    fontSize: 13,
    marginTop: '5%',
  },
  textbox: {
    backgroundColor: '#644693',
    alignItems: 'flex-start',
    textAlignVertical: 'auto',
    borderWidth: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    borderColor: '#431A81',
    marginTop: '3%',
  },
  btnSubmit: {
    color: '#ccc',
    alignSelf: 'flex-start',
    flex: 1,
  },
  backgroundPage: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.95,
    height: '100%',
    width: '100%',
  },
  titleCreateGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    width: 140,
    height: 27,
  },
  buttonView: {
    color: '#FFFFFF',
    alignItems: 'flex-start',
    width: 100,
    height: 40,
    marginTop: 20,
  },
});
