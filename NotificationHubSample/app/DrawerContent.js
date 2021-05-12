import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const glbcolor = '#000';
const glbsize = 60;

import { useDispatch } from 'react-redux';
import { logoutUser } from './data/reducers/auth.reducer';

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const getActiveRouteState = function (routes, index, name) {
    return routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'linear-gradient(0deg, rgba(117, 83, 169, 1), rgba(117, 83, 169, 1)), #7553A9' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  style={{ resizeMode: 'contain', height: 35, width: 35 }}
                  source={require('./Pages/Icons/Logo.png')}
                />
              )}
              labelStyle={{ fontWeight: '600', fontSize: 18, lineHeight: 18, color: '#ffffff', marginLeft: -20 }}
              label="Contoso LS"
              onPress={() => {
                props.navigation.navigate('Users');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Users'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/user.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Users"
              onPress={() => {
                props.navigation.navigate('Users');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Groups'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/group.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Groups"
              onPress={() => {
                props.navigation.navigate('Groups');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Notifications'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/history.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate('Notifications');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Statistics'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/statistics.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Statistics"
              onPress={() => {
                props.navigation.navigate('Statistics');
              }}
            />
            {/* <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'CreateGroup'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/add-group.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Create Group"
              onPress={() => {
                props.navigation.navigate('CreateGroup');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'CreateUser'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/add-friend.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Create User"
              onPress={() => {
                props.navigation.navigate('CreateUser');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Submission'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/Submission.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Submission"
              onPress={() => {
                props.navigation.navigate('Submission');
              }}
            />
            <DrawerItem
            activeBackgroundColor='#6A499E'
            focused={getActiveRouteState(
              props.state.routes,
              props.state.index,
              'Settings'
            )}
              icon={({ color, size }) => (
                <Image
                  style={styles.Imageitem}
                  source={require('./Pages/Icons/settings.png')}
                />
              )}
              labelStyle={styles.labelStyle}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            /> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Image
              style={styles.Imageitem}
              source={require('./Pages/Icons/logout.png')}
            />
          )}
              labelStyle={styles.labelStyle}
              label="Sign Out"
          onPress={() => {
            //console.log('onPress');
            dispatch(logoutUser());
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 0,
  },
  bottomDrawerSection: {
    marginBottom: 0,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  Imageitem: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  labelStyle: {
    color: '#ffffff',
    fontWeight: 'normal',
    fontSize: 14,
    paddingLeft: 0,
    marginLeft: -12,
  }
});
