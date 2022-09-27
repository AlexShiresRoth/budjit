import { useMutation, useQuery } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import { DELETE_GROUP } from '../../../../graphql/mutations/groups.mutations';
import { LOAD_GROUP } from '../../../../graphql/queries/group.query';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import useColorScheme from '../../../../hooks/useColorScheme';
import { setAlert } from '../../../../redux/reducers/alerts.reducers';
import { removeGroupFromState } from '../../../../redux/reducers/groups.reducers';
import { GroupStackParamList } from '../../../../types';
import ChangeGroupImageModal from './ChangeGroupImageModal';

const SettingsCard = styled.View`
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Button = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  alignitems: center;
`;

type NavProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupSettingsScreen'
>;

const GroupSettings = ({ route, navigation }: NavProps) => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const [deleteGroupMutation, { error, loading, data }] =
    useMutation(DELETE_GROUP);

  const {
    error: groupError,
    data: groupData,
    loading: groupLoading,
  } = useQuery(LOAD_GROUP, {
    variables: { input: { groupID: route?.params?.groupId } },
  });

  const [isGroupImageModalVisible, setToggleGroupImageModal] = useState(false);

  const handleDeleteGroup = async (groupID: string = '') => {
    try {
      if (!groupID) return;
      //remove group from db
      await deleteGroupMutation({
        variables: {
          input: { groupID },
        },
      });

      //need to remove group from local state
      dispatch(removeGroupFromState(groupID));
      //set successful alert
      dispatch(setAlert({ message: 'Group deleted', type: 'success' }));
      //navigate back to groups screen
      navigation.navigate('GroupsScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ width: '90%', paddingTop: 40 }}>
          <View
            style={{
              marginBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme].accountBg,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontWeight: '900', fontSize: 32 }}>
              Group Settings
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: Colors[colorScheme].text,
                marginLeft: 2,
              }}
            >
              Edit Group Attributes
            </Text>
          </View>
          <SettingsCard
            style={{
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <Button onPress={() => setToggleGroupImageModal(true)}>
              <FontAwesome
                name="image"
                size={20}
                color={Colors[colorScheme].tint}
              />
              <Text style={{ marginLeft: 10 }}>Change Group Image</Text>
            </Button>
          </SettingsCard>
          <SettingsCard
            style={{
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <Button>
              <FontAwesome
                name="pencil"
                size={20}
                color={Colors[colorScheme].tint}
              />
              <Text style={{ marginLeft: 10 }}>Change Group Name</Text>
            </Button>
          </SettingsCard>
          <SettingsCard
            style={{
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <Button
              style={{ padding: 10 }}
              onPress={() => handleDeleteGroup(route?.params?.groupId)}
            >
              <FontAwesome
                name="trash"
                size={20}
                color={Colors[colorScheme].danger}
              />
              <Text
                style={{ color: Colors[colorScheme].danger, marginLeft: 10 }}
              >
                Delete group!
              </Text>
            </Button>
          </SettingsCard>
        </View>
      </View>
      {/* Show when toggled for group image */}
      {/* Also, only show if group id is passed */}
      {route?.params?.groupId ? (
        <ChangeGroupImageModal
          isModalVisible={isGroupImageModalVisible}
          toggleModal={() => setToggleGroupImageModal(false)}
          currentImage={groupData?.loadGroup?.Group?.backgroundImage ?? ''}
          groupID={route?.params?.groupId}
        />
      ) : null}
    </>
  );
};

export default GroupSettings;
