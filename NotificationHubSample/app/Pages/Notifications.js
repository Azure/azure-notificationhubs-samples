import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from '../data/reducers/notification.reducer';

import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';


const Notifications = ({ navigation, content }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userManagementReducer);
  const { groups } = useSelector((state) => state.groupManagementReducer);
  const { notifications } = useSelector((state) => state.notificationReducer);

  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Pull to refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      let res = await dispatch(getNotifications());
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Error fetching data', res.error.message, [
          { text: 'Okay' },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error fetching data', error.message, [{ text: 'Okay' }]);
    } finally {
      setRefreshing(false);
  }
  }, []);
  
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      let res = await dispatch(getNotifications());
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Error fetching data', res.error.message, [
          { text: 'Okay' },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error fetching data', error.message, [{ text: 'Okay' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notifications !== undefined && notifications.length > 0) {
      // process notifications
      const grps = notifications.reduce((groups, notification) => {
        const date = notification.sentTime.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
      }, {});

      const dataArray = Object.keys(grps).map((date) => {
        return {
          title: date,
          data: grps[date],
        };
      });
      setNotificationList(dataArray);
    }
  }, [notifications]);

  let [selectedTab, setSelectedTab] = useState('All');

  const notificationDetailModal = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  }

  return (
    (Platform.OS === 'windows') ?
      (
        // Main view
        <View style={{ margin: 30, paddingBottom: 50 }}>
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

          {/* Top bar view with tabs */}
          <View style={{ flexDirection: 'row', marginBottom: 27 }}>
            <Text style={(selectedTab === 'All') ? tabStyles.active : tabStyles.inactive} onPress={() => setSelectedTab('All')}>All</Text>
            <Text style={(selectedTab === 'News') ? tabStyles.active : tabStyles.inactive} onPress={() => setSelectedTab('News')}>News</Text>
            <Text style={(selectedTab === 'Survey') ? tabStyles.active : tabStyles.inactive} onPress={() => setSelectedTab('Survey')}>Survey</Text>
            <View onStartShouldSetResponder={() => navigation.navigate('Submission')} style={{ backgroundColor: '#7553A9', paddingHorizontal: 20, paddingTop: 6, paddingBottom: 7, right: 0, position: 'absolute' }}>
              <Text style={{ fontSize: 13, fontWeight: '700' }}>Create New</Text>
            </View>
          </View>
          {/* Timeline section */}
          <ScrollView>
            {/* Notification Group */}
            {(selectedTab === 'All') ?
              notificationList.map(notificationGroup =>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                  {/* Individual Notification view */}
                  {notificationGroup.data.map(notification =>
                    (<View style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                        <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 12, fontWeight: '700' }}>{notification.type}</Text>
                      </View>
                      { notification.type === 'survey' ? <Text style={{ color: '#7553A9', display: 'flex', right: 10, top: 10, position: 'absolute', fontSize: 12, fontWeight: '500' }}>Shared with: {notification?.users?.map((user) => (<Text key={user.id}>{user.userName},</Text>))}, {notification?.surveyGroups?.map((group) => (<Text>{group.groupName},</Text>))}</Text> : <Text>Shared With: All</Text>}
                      <Text style={{ color: '#666666', fontSize: 14, fontWeight: '600', marginTop: 9 }}>{notification.notificationTitle}</Text>
                      <Text style={{ color: '#666666', fontSize: 13, fontWeight: '400' }}>{notification.notificationDescription}</Text>
                    </View>)
                  )}
                </View>
              ) : ((selectedTab === 'News') ?
                notificationList.map(notificationGroup =>
                  (notificationGroup.data.filter(notification => notification.type === "news").length > 0) ?
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                      {/* Individual Notification view */}
                      {notificationGroup.data.filter(notification => notification.type === "news").map(notification =>
                        (<View style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                            <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 12, fontWeight: '700' }}>{notification.type}</Text>
                          </View>
                          <Text style={{ color: '#666666', fontSize: 14, fontWeight: '600', marginTop: 9 }}>{notification.notificationTitle}</Text>
                          <Text style={{ color: '#666666', fontSize: 13, fontWeight: '400' }}>{notification.notificationDescription}</Text>
                        </View>)
                      )}
                    </View> : <></>
                ) :
                notificationList.map(notificationGroup =>
                  (notificationGroup.data.filter(notification => notification.type === "survey").length > 0) ?
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                      <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                      {/* Individual Notification view */}
                      {notificationGroup.data.filter(notification => notification.type === "survey").map(notification =>
                        (<View style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                            <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 12, fontWeight: '700' }}>{notification.type}</Text>
                          </View>
                          <Text style={{ color: '#7553A9', display: 'flex', right: 10, top: 10, position: 'absolute', fontSize: 12, fontWeight: '500' }}>Shared with: {notification?.users?.map((user) => (<Text key={user.id}>{user.userName},</Text>))}, {notification?.surveyGroups?.map((group) => (<Text>{group.groupName},</Text>))}</Text>
                          <Text style={{ color: '#666666', fontSize: 14, fontWeight: '600', marginTop: 9 }}>{notification.notificationTitle}</Text>
                          <Text style={{ color: '#666666', fontSize: 13, fontWeight: '400' }}>{notification.notificationDescription}</Text>
                        </View>)
                      )}
                    </View> : <></>
                )
              )}
          </ScrollView>
        </View>
      ) :
      (
        (content === "All") ?
          // Main view
          <View>
            {/* Timeline section */}
            <ScrollView style={{minHeight: '100%', backgroundColor: '#FFFFFF'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              {/* Notification Group */}
              {notificationList.map(notificationGroup =>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                  {/* Individual Notification view */}
                  {notificationGroup.data.map(notification =>
                    (<View onStartShouldSetResponder={() => notificationDetailModal(notification, notificationGroup.title)} style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                        <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 14, fontWeight: '700' }}>{notification.notificationTitle}</Text>
                      </View>
                      <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, position: 'absolute', right: 10, top: 10, display: 'flex' }}>{(new Date(notification.sentTime)).toLocaleTimeString()}</Text>
                      <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{notification.notificationDescription}</Text>
                    </View>)
                  )}
                </View>
              )}
              <Modal style={{ width: '100%', height: 450, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF', borderTopStartRadius: 8, borderTopRightRadius: 8, margin: 0 }} isVisible={modalVisible} onBackdropPress={() => { setModalVisible(false) }}>
                <View style={{ padding: 24, flex: 1 }}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={(selectedNotification?.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 18, height: 18, marginRight: 7, alignSelf: 'center' }} />
                      <Text style={{ color: (selectedNotification?.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 16, fontWeight: '700' }}>{selectedNotification?.notificationTitle}</Text>
                      <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, display: 'flex', position: 'absolute', right: 0, top: 4 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleTimeString()}</Text>
                    </View>
                    <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleDateString()}</Text>
                    <ScrollView style={{ marginTop: 24, marginBottom: 65 }}>
                      <Text style={{ color: '#333333', fontWeight: '400', fontSize: 13 }}>{selectedNotification?.notificationDescription}</Text>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </View> :
          ((content === "news") ?
            <ScrollView style={{minHeight: '100%', backgroundColor: '#FFFFFF'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              {notificationList.map(notificationGroup =>
                (notificationGroup.data.filter(notification => notification.type === "news").length > 0) ?
                  <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                    {/* Individual Notification view */}
                    {notificationGroup.data.filter(notification => notification.type === "news").map(notification =>
                      (<View onStartShouldSetResponder={() => notificationDetailModal(notification, notificationGroup.title)} style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                          <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 14, fontWeight: '700' }}>{notification.notificationTitle}</Text>
                        </View>
                        <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, position: 'absolute', right: 10, top: 10, display: 'flex' }}>{(new Date(notification.sentTime)).toLocaleTimeString()}</Text>
                        <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{notification.notificationDescription}</Text>
                      </View>)
                    )}
                  </View> : <></>
              )}
              <Modal style={{ width: '100%', height: 450, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF', borderTopStartRadius: 8, borderTopRightRadius: 8, margin: 0 }} isVisible={modalVisible} onBackdropPress={() => { setModalVisible(false) }}>
                <View style={{ padding: 24, flex: 1 }}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={(selectedNotification?.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 18, height: 18, marginRight: 7, alignSelf: 'center' }} />
                      <Text style={{ color: (selectedNotification?.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 16, fontWeight: '700' }}>{selectedNotification?.notificationTitle}</Text>
                      <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, display: 'flex', position: 'absolute', right: 0, top: 4 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleTimeString()}</Text>
                    </View>                    
                    <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleDateString()}</Text>
                    <ScrollView style={{ marginTop: 24, marginBottom: 65 }}>
                      <Text style={{ color: '#333333', fontWeight: '400', fontSize: 13 }}>{selectedNotification?.notificationDescription}</Text>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </ScrollView> :
            <ScrollView style={{minHeight: '100%', backgroundColor: '#FFFFFF'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              {notificationList.map(notificationGroup =>
                (notificationGroup.data.filter(notification => notification.type === "survey").length > 0) ?
                  <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>{notificationGroup.title}</Text>
                    {/* Individual Notification view */}
                    {notificationGroup.data.filter(notification => notification.type === "survey").map(notification =>
                      (<View onStartShouldSetResponder={() => notificationDetailModal(notification, notificationGroup.title)} style={{ borderLeftWidth: 4, borderColor: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', backgroundColor: (notification.type === 'survey') ? '#FFFAF5' : '#F7FBFF', padding: 10, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={(notification.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 14, height: 14, marginRight: 7, alignSelf: 'center' }} />
                          <Text style={{ color: (notification.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 14, fontWeight: '700' }}>{notification.notificationTitle}</Text>
                        </View>
                        <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, position: 'absolute', right: 10, top: 10, display: 'flex' }}>{(new Date(notification.sentTime)).toLocaleTimeString()}</Text>
                        <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{notification.notificationDescription}</Text>
                      </View>)
                    )}
                  </View> : <></>
              )}
              <Modal style={{ width: '100%', height: 450, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF', borderTopStartRadius: 8, borderTopRightRadius: 8, margin: 0 }} isVisible={modalVisible} onBackdropPress={() => { setModalVisible(false) }}>
                <View style={{ padding: 24, flex: 1 }}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={(selectedNotification?.type === 'survey') ? require('./Icons/note_title.png') : require('./Icons/news.png')} style={{ width: 18, height: 18, marginRight: 7, alignSelf: 'center' }} />
                      <Text style={{ color: (selectedNotification?.type === 'survey') ? '#FF9D42' : '#43A2FA', display: 'flex', alignSelf: 'flex-start', fontSize: 16, fontWeight: '700' }}>{selectedNotification?.notificationTitle}</Text>
                      <Text style={{ color: '#999999', fontWeight: '600', fontSize: 11, display: 'flex', position: 'absolute', right: 0, top: 4 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleTimeString()}</Text>
                    </View>
                    <Text style={{ color: '#999999', fontWeight: '600', fontSize: 12 }}>{(new Date(selectedNotification?.sentTime))?.toLocaleDateString()}</Text>
                    <ScrollView style={{ marginTop: 24, marginBottom: 65 }}>
                      <Text style={{ color: '#333333', fontWeight: '400', fontSize: 13 }}>{selectedNotification?.notificationDescription}</Text>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          )
      )
  );
}

export default Notifications;

const tabStyles = StyleSheet.create({
  inactive: {
    color: '#999999',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 40
  },
  active: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 40
  }
});