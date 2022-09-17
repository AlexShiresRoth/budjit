import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import useFetchGroupMembers from '../../hooks/useFetchGroupMembers';
import { RootStackParamList } from '../../types';
import { GroupType } from '../../types/Groups.types';

type Props = {
  item: GroupType;
};

type Navigation = NativeStackScreenProps<RootStackParamList, 'GroupsScreen'>;

const GroupItem = ({ item, navigation }: Props & Navigation) => {
  const colorScheme = useColorScheme();

  //fetch members to show as a preview on the item
  const { members } = useFetchGroupMembers({
    groupID: item._id,
  });

  //navigate to each group's feed
  const goToGroupScreen = (id: string) =>
    navigation.navigate('GroupScreen', { groupId: id });

  return (
    <TouchableOpacity
      style={{
        marginVertical: 2,
        width: '100%',
        alignItems: 'center',
        position: 'relative',
      }}
      onPress={() => goToGroupScreen(item._id)}
    >
      <Image
        source={{
          uri: item?.backgroundImage ?? '',
        }}
        style={{
          width: '95%',
          height: '100%',
          position: 'absolute',
          borderRadius: 5,
        }}
      />
      <View
        style={{
          width: '95%',
          padding: 10,
          backgroundColor: Colors[colorScheme].tint + '90',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,
              color: Colors[colorScheme].background,
            }}
          >
            {item.name}
          </Text>
          <View style={{ marginTop: 5 }}>
            {members?.map((member) => {
              return (
                <View key={member.account._id} style={{ flexDirection: 'row' }}>
                  <Image
                    source={{ uri: member?.profile?.avatar }}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 500,
                      marginRight: 2,
                    }}
                  />
                  <Text style={{ color: Colors[colorScheme].background }}>
                    {member.account.name}
                  </Text>
                </View>
              );
            })}
            {members.length > 5 ? (
              <Text style={{ color: Colors[colorScheme].background }}>
                ... more
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          {/* Make this last time group was updated */}
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].background,
              fontWeight: '700',
            }}
          >
            {format(new Date(item.creationDate), 'MMM dd, yyyy')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
