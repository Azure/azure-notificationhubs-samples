/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Alert, Navigator, TouchableOpacity, Image, Platform } from 'react-native';
import { logoutUser } from './data/reducers/auth.reducer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton, Colors } from 'react-native-paper';
import Users from './Pages/Users';
import Groups from './Pages/Groups';
import Notifications from './Pages/Notifications';
import Statistics from './Pages/Statistics';
import CreateUser from './Pages/CreateUser';
import SettingsScreen from './Pages/Settings';
import Submission from './Pages/Submission';
import CreateGroup from './Pages/CreateGroup';
import DrawerContent from './DrawerContent';

// redux
import { useSelector, useDispatch } from 'react-redux';

import reducers from './data/reducers';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { checkLogin } from './data/reducers/auth.reducer';
import RootStackScreen from './Pages/RootStackScreen';

import { registerDevice, deleteDevice } from "./data/reducers/notification.reducer";
import PushNotificationService from './notifications/NotificationHandlerService';
import DeviceInfo from 'react-native-device-info';

const reduxStore = configureStore({
  reducer: reducers,
});

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const authInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const onTokenReceived = async (token) => {
    setNotificationState({ ...notificationState, registeredToken: token.token, registeredOS: token.os, status: 'The push notification token has been received.' })
    if (Platform.OS !== 'windows' && authInfo?.loggedIn === true) {
      updateNotificationChannel();
    }
    else if (Platform.OS !== 'windows' && authInfo?.loggedIn === false) { 
      deregisterNotificationChannel();
    }
  }

  const onNotificationReceived = async (notification) => {
    console.log(`Received a push notification on ${notificationState.registeredOS}`);
    setNotificationState({ ...notificationState, state: `Received a push notification` });
  }

  const [notificationService, setNotificationService] = useState(new PushNotificationService(onTokenReceived, onNotificationReceived));
  const [notificationState, setNotificationState] = useState({
    deviceId: Platform.OS !== 'windows' ? DeviceInfo.getUniqueId() : '',
    status: 'Push notification registration is unknown',
    registeredOS: '',
    registeredToken: '',
    isRegistered: false
  });

  const updateNotificationChannel = async () => {
    if (!notificationState.registeredToken || !notificationState.registeredOS) {
      console.log('The push notification token wasn\'t received');
      return;
    }

    let status = 'Registering...';
    let isRegistered = notificationState.isRegistered;

    try {
      const pnPlatform = notificationState.registeredOS === 'ios' ? 'apns' : 'fcm';
      const pnToken = notificationState.registeredToken;
      const request = {
        installationId: notificationState.deviceId,
        platform: pnPlatform,
        pushChannel: pnToken,
        tags: []
      };
      console.log(request);
      const response = await dispatch(registerDevice(request));
      if (response.error) {
        throw new Exception(response.error);
      }
      status = `Registered for ${notificationState.registeredOS} push notifications`;
      isRegistered = true;
    } catch (e) {
      console.log(e);
      status = `Registration failed ${e}`;
    } finally {
      setNotificationState({ ...notificationState, isRegistered, status });
    }
  }

  const deregisterNotificationChannel = async () => {
    if (!notificationService) {
      return;
    }

    let status = 'Deregistering...';
    let isRegistered = notificationState.isRegistered;
    try {
      let response = await dispatch(deleteDevice(notificationState.deviceId));
      if (response.error) {
        throw new Exception(response.error);
      }
      status = 'Deregistration successful';
      isRegistered = false;
    } catch (e) {
      console.log(e);
      status = `Deregistration failed: ${e}`;
    } finally {
      setNotificationState({ ...notificationState, isRegistered, status });
    }
  }

  useEffect(() => {
    console.log(notificationState.status);
  }, [notificationState.status])

  useEffect(() => {
    if (notificationState.isRegistered === false && authInfo.loggedIn === true) {
      updateNotificationChannel();
    }
  }, [authInfo.loggedIn])

  return (
    <NavigationContainer style={styles.container}>
      {/* {true ? ( */}
      {authInfo.loggedIn === true ? ((Platform.OS === 'windows') ?
        <Drawer.Navigator drawerStyle={{width:250}} drawerType={ 'permanent'} drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Users" component={UserStackNavigator} />
        <Drawer.Screen name="Groups" component={GroupsStackNavigator} />
        <Drawer.Screen name="Notifications" component={NotificationsStackNavigator} />
        <Drawer.Screen name="Statistics" component={StatisticsStackNavigator} />        
        <Drawer.Screen name="CreateGroup" component={CreateGroupStackNavigator} />
        <Drawer.Screen name="CreateUser" component={CreateUserStackNavigator} />
        <Drawer.Screen name="Submission" component={SubmissionStackNavigator} />        
        <Drawer.Screen name="SettingsScreen" component={SettingsScreenStackNavigator} />
      </Drawer.Navigator> 
      : 
        <Tab.Navigator barStyle={{backgroundColor: '#7553A9'}} activeColor='#FFFFFF' labeled={false}>
          <Tab.Screen name="All" 
          component={AllNotificationsStackNavigator}
            options={{
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="history" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="News" 
          component={NewsNotificationsStackNavigator}
            options={{
              tabBarLabel: 'News',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="newspaper" color={color} size={26} />
              ),
            }}
          />
          
          <Tab.Screen name="Survey" 
          component={SurveyNotificationsStackNavigator}
            options={{
              tabBarLabel: 'Survey',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  console.log('bootstrapping app');
  return (
    <Provider store={reduxStore}>
      <App />
    </Provider>
  );
};

const NavigationDrawerStructure = ({ navigation }) => {
  //console.log(navigation);

  return (
    <View style={{ flexDirection: 'row' }}>
    
    </View>
  );
};
const UserStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Users" component={Users} options={{ title: 'Users', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};
const GroupsStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Groups" component={Groups} options={{ title: 'Groups', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};
const NotificationsStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};
const StatisticsStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};
const CreateGroupStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="CreateGroup" component={CreateGroup} options={{ title: 'Create Group', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};
const CreateUserStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="CreateUser" component={CreateUser} options={{ title: 'Create User', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};

const SubmissionStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Submission" component={Submission} options={{ title: 'Submission', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};

const SettingsScreenStackNavigator = ({ navigation }) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Settings', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),}}/>
    </Navigator.Navigator>
  );
};


const AllNotificationsStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Notifications" component={() => <Notifications content="All"/>} options={{ title: 'Contoso LS', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />), headerRight: () => (
            <IconButton
              onPress={() => {
                dispatch(logoutUser());
              }}
              icon="logout"
              color={Colors.white}
              size={25}
            />
          ),
          }
        }
      />
    </Navigator.Navigator>
  );
};

const NewsNotificationsStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Notifications" component={() => <Notifications content="news"/>} options={{ title: 'Contoso LS', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />),headerRight: () => (
            <IconButton
              onPress={() => {
                dispatch(logoutUser());
              }}
              icon="logout"
              color={Colors.white}
              size={25}
            />
          ),
          }}/>
    </Navigator.Navigator>
  );
};

const SurveyNotificationsStackNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator>
      <Navigator.Screen name="Notifications" component={() => <Notifications content="survey"/>} options={{ title: 'Contoso LS', headerStyle: {backgroundColor: '#6A499E'}, headerTitleContainerStyle: {marginLeft: -62}, headerTitleStyle: {color: 'white'}, headerLeft: () => (<NavigationDrawerStructure navigation={navigation} />), headerRight: () => (
            <IconButton
              onPress={() => {
                dispatch(logoutUser());
              }}
              icon="logout"
              color={Colors.white}
              size={25}
            />
          ),}}/>
    </Navigator.Navigator>
  );
};

export default AppWrapper;
