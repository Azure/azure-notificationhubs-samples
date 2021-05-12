import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  requireNativeComponent,
  Image,
  Alert,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getDashboardInsights } from '../data/reducers/dashboard.reducer';

const CustomGraphControl = requireNativeComponent('CustomGraphControl');

const Statistics = () => {
  const dispatch = useDispatch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const getInsights = async () => {
    let duration = '';
    switch (selectedTabIndex) {
      case 0:
        duration = 'Daily';
        break;
      case 1:
        duration = 'Weekly';
        break;
      case 2:
        duration = 'Monthly';
        break;
      default:
        break;
    }

    try {
      var response = await dispatch(getDashboardInsights(duration));
      if (response.error) {
        Alert.alert('Something went wrong', response.error.message);
      }
    } catch (e) {
      Alert.alert('Something went wrong', e);
    }
  };

  useEffect(() => {
    getInsights();
  }, [selectedTabIndex]);

  const { dashboardInsight } = useSelector((state) => state.dashboardReducer);

  console.log(dashboardInsight);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          padding: 30,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: 202,
            width: '22%',
            backgroundColor: '#ECF6FF',
            marginHorizontal: 14,
            borderRadius: 6,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View style={{ borderRadius: 42, backgroundColor: '#43A2FA' }}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 18,
                width: 18,
                margin: 12,
              }}
              source={require('./Icons/user.png')}
            />
          </View>
          <View style={{ paddingLeft: 10, marginTop: -6 }}>
            <Text style={{ color: '#43A2FA', fontWeight: '700', fontSize: 20 }}>
              {dashboardInsight.totalUsers}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15, fontWeight: '300' }}>
              Registered Users
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: 202,
            width: '22%',
            backgroundColor: '#FCF3EB',
            marginHorizontal: 14,
            borderRadius: 6,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View style={{ borderRadius: 42, backgroundColor: '#FF9D42' }}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 18,
                width: 18,
                margin: 12,
              }}
              source={require('./Icons/group.png')}
            />
          </View>
          <View style={{ paddingLeft: 10, marginTop: -6 }}>
            <Text style={{ color: '#FF9D42', fontWeight: '700', fontSize: 20 }}>
              {dashboardInsight.totalGroups}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15, fontWeight: '300' }}>
              Registered Groups
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: 202,
            width: '22%',
            backgroundColor: '#F1ECF8',
            marginHorizontal: 14,
            borderRadius: 6,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <View style={{ borderRadius: 42, backgroundColor: '#7553A9' }}>
            <Image
              style={{
                resizeMode: 'contain',
                height: 18,
                width: 18,
                margin: 12,
              }}
              source={require('./Icons/history.png')}
            />
          </View>
          <View style={{ paddingLeft: 10, marginTop: -6 }}>
            <Text style={{ color: '#7553A9', fontWeight: '700', fontSize: 20 }}>
              {dashboardInsight.totalNotificationsSent}
            </Text>
            <Text style={{ color: '#666666', fontSize: 15, fontWeight: '300' }}>
              Notifications Sent
            </Text>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ margin: 30 }}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 16,
              fontWeight: '700',
              color: '#000000',
            }}>
            History
          </Text>
          <View
            style={{
              minHeight: 329,
              minWidth: 720,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{ display: 'flex', flexDirection: 'row', height: 50 }}>
              <View
                style={selectedTabIndex === 0 ? styles.selectedTab : styles.tab}
                onStartShouldSetResponder={() => setSelectedTabIndex(0)}>
                <Text
                  style={
                    selectedTabIndex === 0
                      ? styles.selectedTabText
                      : styles.tabText
                  }>
                  Daily
                </Text>
              </View>

              <View
                style={selectedTabIndex === 1 ? styles.selectedTab : styles.tab}
                onStartShouldSetResponder={() => setSelectedTabIndex(1)}>
                <Text
                  style={
                    selectedTabIndex === 1
                      ? styles.selectedTabText
                      : styles.tabText
                  }>
                  Weekly
                </Text>
              </View>

              <View
                style={selectedTabIndex === 2 ? styles.selectedTab : styles.tab}
                onStartShouldSetResponder={() => setSelectedTabIndex(2)}>
                <Text
                  style={
                    selectedTabIndex === 2
                      ? styles.selectedTabText
                      : styles.tabText
                  }>
                  Monthly
                </Text>
              </View>
            </View>
            <CustomGraphControl
              style={styles.customcontrol}
              label="Test Label 123"
              data={JSON.stringify(dashboardInsight.notificationTrends)}
            />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 16,
              fontWeight: '700',
              color: '#000000',
            }}>
            Devices
          </Text>
          <View
            style={{
              height: 220,
              minWidth: 157,
              backgroundColor: '#FFFFFF',
              paddingTop: 8,
            }}>
            <View style={styles.deviceSectionCard}>
              <Image
                style={styles.deviceSectionIcon}
                source={require('./Icons/apple.png')}
              />
              <Text style={styles.deviceSectionText}>{dashboardInsight?.deviceTrends?.find(t => t.deviceType === 'Apple')?.registrationCount + ' iOS'}</Text>
            </View>

            <View style={styles.deviceSectionCard}>
              <Image
                style={styles.deviceSectionIcon}
                source={require('./Icons/android.png')}
              />
              <Text style={styles.deviceSectionText}>{dashboardInsight?.deviceTrends?.find(t => t.deviceType === 'Android')?.registrationCount + ' Android'}</Text>
            </View>

            {/* <View style={styles.deviceSectionCard}>
              <Image
                style={styles.deviceSectionIcon}
                source={require('./Icons/windows.png')}
              />
              <Text style={styles.deviceSectionText}>{dashboardInsight?.deviceTrends?.find(t => t.deviceType === 'Windows')?.registrationCount + ' Windows'}</Text>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    color: '#000000',
  },
  customcontrol: {
    color: '#333333',
    width: 800,
    height: 400,
    margin: 10,
  },
  tab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#C0C0D0',
    alignSelf: 'center',
    paddingHorizontal: 39,
    paddingVertical: 16,
  },
  selectedTab: {
    backgroundColor: '#E8E8F2',
  },
  selectedTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7553A9',
    alignSelf: 'center',
    paddingHorizontal: 39,
    paddingVertical: 16,
  },
  deviceSectionCard: {
    height: 75,
    width: 120,
    backgroundColor: '#F1ECF8',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 22,
  },
  deviceSectionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    alignSelf: 'center',
    marginTop: 4,
  },
  deviceSectionIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default Statistics;
