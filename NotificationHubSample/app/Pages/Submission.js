import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import styles from '../Styles/styles';
import AutoTags from 'react-native-tag-autocomplete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../data/reducers/user-management.reducer';
import { getSurveyGroups } from '../data/reducers/group-management.reducer';
import { getNotifications, sendNotification } from '../data/reducers/notification.reducer';

var radio_props = [
  { label: 'Survey', value: 'survey' },
  { label: 'News', value: 'news' }
];

const Submission = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userManagementReducer);
  const { groups } = useSelector((state) => state.groupManagementReducer);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (users === undefined || users.length === 0) {
      dispatch(getUsers());
    }
  }, [])

  useEffect(() => {
    if (groups === undefined || groups.length === 0) {
      dispatch(getSurveyGroups());
    }
  }, [])

  // tag suggestions
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    let newSuggestions = [
      ...users?.map(user => ({ name: user.userName, type: 'user', id: user.id })),
      ...groups?.map(group => ({ name: group.groupName, type: 'group', id: group.id }))
    ];
    console.log('setting suggestions');
    console.log(newSuggestions);
    setSuggestions(newSuggestions);
  }, [users, groups]);

  // selected tags
  const [selectedTags, setSelectedTags] = useState([]);
  const [notificationDraft, setNotificationDraft] = useState({ type: 'survey', notificationTitle: '', notificationDescription: '', userTags: [], surveyGroupTags: [], sentTime: (new Date()).toISOString() });

  const attachimage = () => {
    console.log('image attach');
  }

  const handleDelete = (tag) => {
    if (tag.type === 'user') {
      let userTags = notificationDraft.userTags.filter(user => user.id !== tag.id);
      setNotificationDraft({ ...notificationDraft, userTags });
    } else {
      let surveyGroupTags = notificationDraft.surveyGroupTags.filter(group => group.id !== tag.id);
      setNotificationDraft({ ...notificationDraft, surveyGroupTags });
    }

    setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
  };

  const handleAddition = (suggestion) => {
    setSelectedTags([...selectedTags, suggestion])
    if (suggestion.type === 'user') {
      let userTags = [...notificationDraft.userTags, suggestion.id];
      setNotificationDraft({ ...notificationDraft, userTags });
    } else {
      let surveyGroupTags = [...notificationDraft.surveyGroupTags, suggestion.id];
      setNotificationDraft({ ...notificationDraft, surveyGroupTags })
    }
  };

  const renderSuggestions = (tag) => {
    return (
      <View style={{ padding: 10, backgroundColor: 'whitesmoke' }}>
        <Text style={{ color: 'black' }}>{tag.name}</Text>
      </View>
    )
  }

  const customRenderTags = (tags) => {
    //override the tags render
    return (
      <View style={LocalStyles.customTagsContainer}>
        {tags.map((t, i) => {
          return (
            <View
              key={i.toString()}
              style={{ ...LocalStyles.customTag, backgroundColor: (t.type === 'group' ? '#F8F6FA' : '#F2F8FD'), borderColor: (t.type === 'group' ? '#F8F6FA' : '#F2F8FD'), borderWidth: 1 }} >
              <Text numberOfLines={1} style={{ color: (t.type === 'group' ? '#7553A9' : '#0078D7'), textAlignVertical: 'center' }}>
                {t.name}
              </Text>
              <TouchableOpacity
                onPress={() => handleDelete(t)}
              >
                <FontAwesome name='times' color='#000000' />
                {/* <Image style={{ resizeMode: 'contain', height: 10, width: 10, marginHorizontal: 5, paddingVertical: 0 }} source={require('./Icons/close.png')} /> */}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  const setText = (text) => {
    setNotificationDraft({ ...notificationDraft, notificationTitle: text });
  };

  const setTextd = (text) => {
    setNotificationDraft({ ...notificationDraft, notificationDescription: text });
  };

  const postNotification = async () => {
    console.log('sending notification...');
    setLoading(true);
    try {
      let res = await dispatch(sendNotification(notificationDraft));
      if (res.error) {
        console.log(res.error.message);
        Alert.alert('Error Sending Notification!', res.error.message, [{ text: 'Okay' }]);
      } else {
        dispatch(getNotifications());
        navigation.navigate('Notifications');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error Sending Notification!', e.message, [{ text: 'Okay' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
      <View style={{ width: '100%' }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            padding: '5%',
            width: '70%',
            display: 'flex',
            flexDirection: 'column'
          }}>

          <RadioForm
            style={{ marginBottom: 20 }}
            labelStyle={{ marginRight: 50 }}
            selectedLabelColor={'#7553A9'}
            formHorizontal={true}
            labelColor={'#7553A9'}
            selectedButtonColor='#7553A9'
            buttonColor='#7553A9'
            buttonSize={15}
            buttonOuterSize={18}
            radio_props={radio_props}
            initial={notificationDraft.type}
            onPress={(value) => { setNotificationDraft({ ...notificationDraft, type: value }) }}
          />

          <Text style={LocalStyles.text}>Enter Title:</Text>
          <TextInput
            style={LocalStyles.textbox}
            defaultValue={notificationDraft.notificationTitle}
            onChangeText={setText}
          />
          <Text style={LocalStyles.text}>Enter Body:</Text>
          <TextInput
            multiline
            style={LocalStyles.textboxdes}
            defaultValue={notificationDraft.notificationDescription}
            onChangeText={setTextd}
          />
          {/* <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#9E9EB3', alignSelf: 'flex-start' }}
            onPress={() => attachimage()} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', borderColor: 'white', borderRightWidth: 0.5 }}>
              <Text style={{ textAlignVertical: 'center', margin: 5, fontWeight: '600', fontSize: 13 }}>Attach Image</Text>
            </View>
            <Image style={{ resizeMode: 'contain', height: 16, width: 16, margin: 7 }} source={require('./Icons/Attach.png')} />
          </TouchableOpacity> */}

          {notificationDraft?.type === 'survey' ?
            <View>
              <Text style={{ ...LocalStyles.text, marginTop: 20 }}>Send to:</Text>
              <View style={{ display: 'flex', height: 80, width: '100%', alignSelf: 'flex-start' }}>
                <View style={{ top: 18, position: 'absolute', flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#EEEEEE', alignSelf: 'stretch', padding: 10 }}>
                  <AutoTags
                    style={{
                      color: '#333333',
                      backgroundColor: '#f5f5f5',
                      borderColor: '#a5a5a5',
                      borderRadius: 15,
                      flexWrap: 'wrap',
                      flexDirection: "row",
                      minWidth: 120,
                    }}
                    inputContainerStyle={{
                      margin: 2,
                      borderRadius: 15,
                      paddingLeft: 8,
                      minWidth: 120,
                    }}
                    multiline={false}
                    createTagOnSpace={false}
                    suggestions={suggestions}
                    tagsSelected={selectedTags}
                    handleAddition={handleAddition}
                    handleDelete={handleDelete}
                    renderTags={customRenderTags}
                    renderSuggestion={renderSuggestions}
                  />
                </View>
              </View>
            </View> : <Text></Text>}
          <View style={{ alignSelf: 'flex-end', marginTop: 30, marginBottom: 20 }}>
            <Button style={LocalStyles.btnSend} title="Send" onPress={(e) => postNotification()} />
          </View>
        </View>

        <View style={LocalStyles.preview}>
          <View
            style={{
              backgroundColor: '#7553A9',
              start: '0%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '5%',
            }}>
            <Text
              style={{
                fontWeight: '600',
                paddingRight: 20,
                textAlignVertical: 'center',
                backgroundColor: '#7553A9',
              }}>
              Preview
          </Text>
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              height: '80%',
              alignItems: 'flex-start',
              padding: '5%',
            }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#EEEEEE', alignSelf: 'stretch', paddingRight: '10%' }}>
              <Image style={{ resizeMode: 'contain', height: 15, width: 15, marginHorizontal: 5, paddingVertical: 10 }} source={(notificationDraft.type !== 'news') ? require('./Icons/note_title.png') : require('./Icons/news.png')} />
              <Text numberOfLines={20} style={LocalStyles.previewtext}>{notificationDraft.notificationTitle}</Text>
            </View>
            <Text style={{ marginTop: 6, color: 'black' }}>{notificationDraft.notificationDescription}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Submission;

const LocalStyles = StyleSheet.create({
  container: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    padding: '5%',
    paddingBottom: '8%'
  },
  container2: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    marginTop: '0%',
  },
  preview: {
    flex: 1,
    position: 'absolute',
    top: 0,
    start: '70%',
    height: '100%',
    width: '35%',
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    padding: '0%',
    marginLeft: 40,
  },

  text: {
    color: 'black',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  previewtext: {
    fontWeight: 'bold',
    color: '#FF9D42',
    alignItems: 'baseline',
    paddingBottom: 10,
    textAlignVertical: 'center'
  },
  previewtextdes: {
    marginTop: 20,
    color: '#77b',
    alignItems: 'baseline',
    marginBottom: 2,
    padding: '5%'
  },
  textbox: {
    color: '#000',
    backgroundColor: '#F7F7FB',
    alignItems: 'flex-start',
    textAlignVertical: 'auto',
    marginBottom: 20,
  },
  csttags: {
    color: '#000',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    textAlignVertical: 'auto',
    marginBottom: 10,
  },
  textboxdes: {
    flex: 1,
    minHeight: '10%',
    color: '#000',
    backgroundColor: '#F7F7FB',
    alignItems: 'flex-start',
    textAlignVertical: 'auto',
    marginBottom: 10,
  },
  btnButtons: {
    width: '30%',
    color: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    start: '50%',
    marginBottom: 10,
    backgroundColor: '#7553A9',
  },
  btnSend: {
    color: '#ccc',
    marginTop: 10,
  },
  customTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  customTag: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 30,
    margin: 2,
    minWidth: 120,
    // backgroundColor: '#dfd4f1',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
    // borderColor: '#7553A9',
    // borderWidth: 1
  },
});
