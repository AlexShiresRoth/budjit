import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';
import { LOAD_GROUP } from '../../../graphql/queries/group.query';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

type Navigation = NativeStackScreenProps<RootStackParamList, 'GroupScreen'>;

export const Group = ({ route }: Navigation) => {
  const colorScheme = useColorScheme();
  //group id should be passed from the previous screen
  const groupID = route?.params?.groupId ?? '';
  //fetch the group with provided id
  const { error, data, loading } = useQuery(LOAD_GROUP, {
    variables: { input: { groupID } },
  });

  console.log('group!', error, data, loading, 'group id', route);

  //TODO create main loading screen. Probably a skeleton screen with dynamic height
  if (loading) {
    return (
      <View>
        <Text>Loading Group...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        {/* TODO create error page */}
        <Text>{error?.message ?? 'Something went wrong!'}</Text>
      </View>
    );
  }

  return (
    <View style={{ justifyContent: 'center' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 120,
          backgroundColor: '#333',
        }}
      >
        <Image
          source={{ uri: data?.loadGroup?.Group?.backgroundImage }}
          style={{
            width: '100%',
            height: 120,
            position: 'absolute',
            top: 0,
            opacity: 0.4,
          }}
        />
        <Text
          style={{
            elevation: 3,
            color: Colors[colorScheme].background,
            fontSize: 30,
          }}
        >
          {data?.loadGroup?.Group?.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].accountBg,
        }}
      >
        <TouchableOpacity
          style={{
            margin: 5,
            padding: 10,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <Text>Members</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 5,
            padding: 10,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <Text>Invites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 5,
            padding: 10,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <Text>Group Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
