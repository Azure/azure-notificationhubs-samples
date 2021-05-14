import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import styles from '../Styles/styles';

import { useDispatch } from 'react-redux';
import { loginUser } from '../data/reducers/auth.reducer';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isLoading: false
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async (userName, password) => {
    console.log(data);
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{ text: 'Okay' }],
      );
      return;
    }

    try {
      console.log('dispatching login user');
      setData(
        {
          ...data,
          isLoading: true
        }
      )
      let res = await dispatch(
        loginUser({ username: data.username, password: data.password }),
      );
      console.log('response:');
      console.log(res);
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Login Failed!', res.error.message, [{ text: 'Okay' }]);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Login Failed!', e.message, [{ text: 'Okay' }]);
    } finally {
      setData(
        {
          ...data,
          isLoading: false
        }
      )
    }
  };

  const [remMeCheckboxState,setRemMeCheckboxState] = useState(false);

  let mobilePlatforms = ['android','ios']

  return (
    <View>
      <Image
        source={require('./Images/LoginBg.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        blurRadius={50}
      />
      <View
        style={{
          backgroundColor: '#7553A985',
          height: '100%',
          width: '100%',
          zIndex: 2,
        }}
      />
        <View style={(mobilePlatforms.includes(Platform.OS))?[{
            height: '100%',
            width:'100%',
            position: 'absolute',
            zIndex:3
        },styles.centerChildren]:{
            height: '100%',
            width:'100%',
            position: 'absolute',
            zIndex:3,
        }}>
        <View style={(mobilePlatforms.includes(Platform.OS))?[{
                flexDirection:'row',
                marginBottom: 32
            },styles.verticalCenterChildren]:[styles.verticalCenterChildren,{
                position:'absolute',
                left: 30,
                top: '50%',
                flexDirection: 'row',
            }]}>
          <Image
            source={require('./Icons/Logo.png')}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ 
              fontWeight: '700', 
              fontSize: 32,
              color: 'white',
              fontFamily: 'Segoe UI',
            }}>CONTOSO LS</Text>
        </View>
        <View style={(mobilePlatforms.includes(Platform.OS))?{
              height:440,
              width:350,
              backgroundColor:'white',
              borderRadius: 8,
            }:{
                height: 440,
                width: 350,
                backgroundColor: "white",
                borderRadius: 8,
                position: 'absolute',
                right: 30,
                top: '25%',
                bottom: '25%'
              }
            }>
          <View
            style={{
              marginLeft: 36,
              marginRight: 36,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ fontSize: 28, marginTop: 32, }}>
                <Text style={{ color: '#7E5EAE', fontWeight: '500' }}>
                  Login
                </Text>
                <Text style={{ color: 'black', fontWeight: '100' }}>
                  {' '}
                  To Your Account
                </Text>
              </Text>
            </View>

            <Text style={{ color: 'black', marginTop: 32 }}>User Name</Text>

            <TextInput
              style={[
                {
                  marginTop: 8,
                  fontSize: 16,
                  backgroundColor: 'white',
                  borderColor: 'gray',
                  color: 'black',
                },
              ]}
              placeholder="User Name"
              placeholderTextColor={'#666666'}
              onChangeText={(val) => textInputChange(val)}
            />

            <Text style={{ color: 'black', marginTop: 32 }}>Password</Text>

            <TextInput
              style={[
                {
                  marginTop: 8,
                  fontSize: 16,
                  backgroundColor: 'white',
                  borderColor: 'gray',
                  color: 'black',
                },
              ]}
              placeholder="Password"
              placeholderTextColor={'#666666'}
              onChangeText={(val) => handlePasswordChange(val)}
              secureTextEntry={true}
            />

            <TouchableOpacity
              onPress={() => {
                console.log('Forgot Password...');
              }}>
              <Text
                style={{
                  color: '#7553A9',
                  fontSize: 12,
                  textAlign: 'right',
                  margin: 8,
                  textDecorationLine: 'underline',
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
            <View 
              style={
                {marginTop: 32}
              }>
              <Button
                color="#7553A9"
                title={'LOG IN'}
                onPress={() => {
                  loginHandle(data.username, data.password);
                }}
              />
            </View>            
          </View>
          {data.isLoading ? <View style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffffcc',
              position:'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator 
                  size="large"
                />
          </View> : <View></View>
          }
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
