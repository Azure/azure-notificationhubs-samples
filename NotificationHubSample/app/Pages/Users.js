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

import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../data/reducers/user-management.reducer';
import {
  getSurveyGroups,
  addUserToGroup,
  removeUserFromGroup,
  updateSurveyGroups,
} from '../data/reducers/group-management.reducer';

const Users = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userManagementReducer);
  const { groups } = useSelector((state) => state.groupManagementReducer);

  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getSurveyGroups());
  }, []);

  const updateGroupsAssociation = async () => {
    try {
      setLoading(true);
      let modifiedGroups = groups?.filter((group) => group.modified === true);
      let res = await dispatch(updateSurveyGroups(modifiedGroups));
      if (res.error) {
        Alert.alert('Update failed!', res.error.message, [{ text: 'Ok' }]);
      } else {
        // refresh users
        dispatch(getUsers());

        // refresh groups
        dispatch(getSurveyGroups());
      }
    } catch (error) {
      Alert.alert('Update failed!', error.message, [{ text: 'Ok' }]);
    } finally {
      setLoading(false);
    }
  };

  const RenderGroups = (props) => {
    if (props.userID != null) {
      return (
        <View>
          <View style={userTableStyle.row}>
            <Text
              style={[
                userTableStyle.bold,
                userTableStyle.textDark,
                {
                  width: '60%',
                },
              ]}>
              Group Name
            </Text>
            <Text style={[userTableStyle.bold, userTableStyle.textDark]}>
              Number of Users
            </Text>
          </View>
          <View
            style={{
              marginTop: 16,
            }}>
            <FlatList
              data={groups}
              renderItem={({ item }) => (
                <RenderGroupName item={item} userID={props.userID} />
              )}
              keyExtractor={(group) => group.id}
            />
          </View>
        </View>
      );
    } else {
      return <Text>No User Selected</Text>;
    }
  };

  const RenderGroupName = ({ item, userID }) => {
    return (
      <TouchableOpacity>
        <View
          style={[
            userTableStyle.row,
            {
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              width: '80%',
            },
          ]}>
          <Checkbox
            value={item.applicationUserIds.includes(userID)}
            tintColor={'#fff'}
            onValueChange={(value) => {
              if (value === true) {
                dispatch(addUserToGroup({ id: item.id, userId: userID }));
              } else {
                dispatch(removeUserFromGroup({ id: item.id, userId: userID }));
              }
            }}
            disabled={false}
          />
          <Text style={[{ width: '70%' }, userTableStyle.textDark]}>
            {item.groupName}
          </Text>
          <Text style={[userTableStyle.textDark]}>
            {item.applicationUsers.length}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (rowData) => {
    let checkboxSelection = rowData.item.id == selectedId;
    let bgColor = checkboxSelection
      ? userTableStyle.rowfocusedbg
      : userTableStyle.rowbg;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(rowData.item.id);
        }}>
        <View
          style={[
            userTableStyle.row,
            bgColor,
            {
              padding: 4,
            },
          ]}>
          <View
            style={[
              userTableStyle.cell1,
              {
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
              },
            ]}>
            <Checkbox
              disabled={false}
              onValueChange={() => { }}
              value={checkboxSelection}
            />
            <Text style={userTableStyle.textDark}>{rowData.item.userName}</Text>
          </View>
          <View
            style={[
              userTableStyle.cell2,
              {
                display: 'flex',
                justifyContent: 'center',
              },
            ]}>
            <Text style={userTableStyle.textDark}>
              {rowData.item.surveyGroups.length}
            </Text>
          </View>
          <View
            style={[
              userTableStyle.cell4,
              {
                display: 'flex',
                justifyContent: 'center',
              },
            ]}>
            <Text style={userTableStyle.linkcolor}>Assign Group</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
   
  return (
    <View style={userStyles.parent}>
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
        style={[userStyles.left, { display: 'flex', alignItems: 'center' }]}>
        <View style={[{ display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '70%', margin: 8 }}>
            <Text
              style={{
                fontSize: 32,
                color: 'black',
                fontWeight: 'bold',
                width: '60%',
              }}>
              User List
            </Text>
          </View>
          <View
            style={[
              {
                justifyContent: 'center',
                width: '20%',
              },
            ]}>
            <Button
              title={'Add Users'}
              color="#7553A9"
              onPress={(e) => {
                navigation.navigate('CreateUser');
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '90%',
              margin: 16,
              color: 'black',
              backgroundColor: 'white',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            defaultValue="Search a User Name"
          />
        </View>
        <View style={{ width: '95%' }}>
          <View style={[userTableStyle.row, { padding: 8 }]}>
            <View style={userTableStyle.cell1}>
              <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
                User Name
              </Text>
            </View>
            <View style={userTableStyle.cell2}>
              <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
                Group
              </Text>
            </View>
            {/* <View style={userTableStyle.cell3}>
            <Text style={[userTableStyle.textDark, userTableStyle.bold]}>
              Mobile Number
            </Text>
          </View> */}
            <View style={userTableStyle.cell4} />
          </View>
          <View style={[userStyles.row, { padding: 8 }]}>
            <FlatList
              data={users}
              keyExtractor={(data) => data.id}
              renderItem={renderItem}
              extraData={selectedId}
            />
          </View>
        </View>
      </View>
      <View style={userStyles.right}>
        <View style={[{ display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '70%', margin: 8 }}>
            <Text
              style={{
                fontSize: 32,
                color: 'black',
                fontWeight: 'bold',
                width: '60%',
              }}>
              Groups
            </Text>
          </View>
          <View style={{ width: '20%' }}>
            <Button
              color="#7553A9"
              title={'Update Groups'}
              onPress={() => {
                updateGroupsAssociation();
              }}
            />
          </View>
        </View>
        <TextInput
          style={{
            width: '90%',
            margin: 16,
            color: 'black',
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          defaultValue="Search a Group Name"
        />
        <View style={{ padding: 8 }}>
          <RenderGroups userID={selectedId} />
        </View>
      </View>
    </View>
  );
};

let userTableStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell1: {
    width: '50%',
  },
  cell2: {
    width: '30%',
  },
  cell4: {
    width: '20%',
  },
  textCenter: {
    textAlign: 'center',
  },
  textDark: {
    color: 'black',
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
});

Users.propTypes = {
  zoomEnabled: PropTypes.bool,
};

export default Users;
