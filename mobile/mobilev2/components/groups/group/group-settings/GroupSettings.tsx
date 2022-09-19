import { useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DELETE_GROUP } from '../../../../graphql/mutations/groups.mutations';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { removeGroupFromState } from '../../../../redux/reducers/groups.reducers';
import { GroupStackParamList } from '../../../../types';

type NavProps = NativeStackScreenProps<
  GroupStackParamList,
  'GroupSettingsScreen'
>;

const GroupSettings = ({ route, navigation }: NavProps) => {
  const dispatch = useAppDispatch();

  const [deleteGroupMutation, { error, loading, data }] =
    useMutation(DELETE_GROUP);

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

      //TODO: need to fix navigation on delete group, just goes back to the group that was deleted
      //TODO also need to display an alert
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 10 }}
        onPress={() => handleDeleteGroup(route?.params?.groupId)}
      >
        <Text style={{ color: '#fff' }}>Delete group!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupSettings;
