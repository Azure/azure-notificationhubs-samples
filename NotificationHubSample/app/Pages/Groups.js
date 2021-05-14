/* eslint-disable react-native/no-inline-styles */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import userStyles from '../Styles/userspage';

import styles from '../Styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../data/reducers/user-management.reducer';
import {
  getSurveyGroups,
  updateSurveyGroup,
  addUserToGroup,
  removeUserFromGroup,
} from '../data/reducers/group-management.reducer';


const Groups = ({ navigation }) => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.userManagementReducer);
  const { groups } = useSelector((state) => state.groupManagementReducer);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const updateSelectedGroup = async () => {
    try {
      let groupToUpdate = groups[selectedGroup];
      if (groupToUpdate === undefined) {
        Alert.alert(
          'No group selected',
          'Please select a group to update.'[{ text: 'Ok' }],
        );
        return;
      }
      setLoading(true);
      let res = await dispatch(updateSurveyGroup(groupToUpdate));
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Update Failed!', res.error.message, [{ text: 'Ok' }]);
      } else {
        console.log('Group updated successfully!');
        Alert.alert(
          'Group Updated',
          'Users were successfully added / removed from the Survey Group.',
          [{ text: 'Ok' }],
        );
        dispatch(getSurveyGroups());
        dispatch(getUsers());
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Update Failed!', e.message, [{ text: 'Ok' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getSurveyGroups());
  }, []);

  const RenderUsersFromGroupSelected = (props) => {
    if (props.groupData != null) {
      return (
        <View style={{ width: '100%' }}>
          {console.log(props.groupData)}
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <RenderUserNames item={item} groupData={props.groupData} />
            )}
            keyExtractor={(data) => {
              return data.id.toString();
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Nothing selected</Text>
        </View>
      );
    }
  };

  const RenderUserNames = ({ item, groupData }) => {
    return (
      <TouchableOpacity>
        <View
          style={[
            userTableStyle.row,
            {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              width: '100%',
              padding: 4,
              paddingLeft: 16,
            },
          ]}>
          <Checkbox
            value={groupData.applicationUserIds.includes(item.id)}
            tintColor={'#fff'}
            onValueChange={(value) => {
              if (value === true) {
                dispatch(addUserToGroup({ id: groupData.id, userId: item.id }));
              } else {
                dispatch(
                  removeUserFromGroup({ id: groupData.id, userId: item.id }),
                );
              }
            }}
            disabled={false}
          />
          <Text style={[{ width: '50%' }, userTableStyle.textDark]}>
            {item.userName}
          </Text>
          <Text style={[userTableStyle.textDark]}>
            {item.surveyGroups.length}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (rowData) => {
    let checkboxState = selectedGroup === rowData.index ? true : false;
    let backgroundColor = checkboxState
      ? userTableStyle.rowbg
      : userTableStyle.rowfocusedbg;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedGroup(rowData.index);
        }}>
        <View
          style={[
            userTableStyle.row,
            backgroundColor,
            {
              padding: 4,
            },
          ]}>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
                padding: 4,
              },
            ]}>
            <Checkbox
              disabled={false}
              onValueChange={() => {
                setSelectedGroup(rowData.index);
              }}
              value={checkboxState}
            />
            <Text style={userTableStyle.textDark}>
              {rowData.item.groupName}
            </Text>
          </View>
          <View
            style={[
              userTableStyle.cell2,
              {
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
              },
            ]}>
            <Text style={userTableStyle.textDark}>
              {rowData.item.applicationUsers.length}
            </Text>
          </View>         
          <View
            style={[
              userTableStyle.cell4,
              {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <Text style={userTableStyle.linkcolor}>Assign Group</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
      }}>
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
      <View
        style={[
          userStyles.left,
          { backgroundColor: 'white', alignItems: 'center' },
        ]}>
        <View
          style={[userStyles.row, { display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '70%' }}>
            <Text style={userTableStyle.pageHeader}>Survey Groups</Text>
          </View>
          <View style={{ width: '20%' }}>
            <Button
              color="#7553A9"
              title={'Add Survey Group'}
              onPress={() => {
                navigation.navigate('CreateGroup');
              }}
            />
          </View>
        </View>

        <TextInput
          style={userTableStyle.textInputStyle}
          defaultValue="Search a Group Name"
        />

        <View style={[{ width: '90%', display: 'flex', flexDirection: 'row' }]}>
          <View style={[{ width: '50%' }]}>
            <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
              Group Name
            </Text>
          </View>
          <View style={[{ width: '20%' }]}>
            <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
              # of Users
            </Text>
          </View>
          {/* <View style={userTableStyle.cell3}>
          <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
            Mobile Number
          </Text>
        </View> */}
          <View style={userTableStyle.cell4} />
        </View>

        <View
          style={[
            userStyles.row,
            {
              paddingTop: 8,
              width: '90%',
            },
          ]}>
          <FlatList
            data={groups}
            keyExtractor={(data) => data.id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View
        style={[
          userStyles.right,
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        ]}>
        <View style={[userTableStyle.row, { width: '90%' }]}>
          <Text style={[userTableStyle.pageHeader, { width: '70%' }]}>
            <Text>User List</Text>
          </Text>

          <Button
            color="#7553A9"
            title={'Update User List'}
            onPress={() => {
              updateSelectedGroup();
            }}
          />
        </View>

        <TextInput
          style={userTableStyle.textInputStyle}
          defaultValue="Search a Group Name"
        />

        <View style={{ width: '90%' }}>
          <View style={[userTableStyle.row, { marginTop: 8, marginBottom: 8 }]}>
            <Text
              style={[
                userTableStyle.textDark,
                userTableStyle.bold,
                { width: '50%' },
              ]}>
              Users Names
            </Text>

            <Text
              style={[
                userTableStyle.textDark,
                userTableStyle.bold,
                { width: '25%' },
              ]}>
              Groups
            </Text>

            <Text
              style={[
                userTableStyle.textDark,
                userTableStyle.bold,
                { width: '25%' },
              ]}
            />
          </View>

          <View style={userTableStyle.row}>
            <RenderUsersFromGroupSelected
              groupData={selectedGroup == null ? null : groups[selectedGroup]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Groups;

let userTableStyle = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  cell1: {
    width: '40%',
  },
  cell2: {
    width: '15%',
  },
  cell3: {
    width: '25%',
  },
  cell4: {
    width: '20%',
  },
  textCenter: {
    textAlign: 'center',
  },
  textDark: {
    color: 'black',
    padding: 8,
  },
  bold: {
    fontWeight: '500',
  },
  rowbg: {
    backgroundColor: '#F7F7FB',
  },
  rowfocusedbg: {
    backgroundColor: '#E3E3F1',
  },
  linkcolor: {
    color: '#906FC0',
  },
  textInputStyle: {
    marginTop: 16,
    width: '90%',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
  },
  pageHeader: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    width: '60%',
  },
});
