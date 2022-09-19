import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  GroupStackParamList,
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client';
import { LOAD_GROUP } from '../../../graphql/queries/group.query';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

type Navigation = NativeStackScreenProps<GroupStackParamList, 'GroupScreen'>;

type ScreenItemsType = Array<{
  displayText: string;
  screenName: string;
  iconName: string;
}>;

type AvailableScreens =
  | 'GroupOccasionsScreen'
  | 'GroupMembersScreen'
  | 'GroupSettingsScreen'
  | 'GroupInvitesScreen';

export const Group = ({ route, navigation }: Navigation) => {
  const colorScheme = useColorScheme();
  //group id should be passed from the previous screen
  const groupID = route?.params?.groupId ?? '';
  //fetch the group with provided id
  const { error, data, loading } = useQuery(LOAD_GROUP, {
    variables: { input: { groupID } },
  });

  const handleNavigation = (screenName: AvailableScreens) =>
    navigation.navigate(screenName, {
      groupId: groupID,
    });

  //easier to maintain the screens in an array
  const ITEMS_DATA: ScreenItemsType = [
    {
      displayText: 'Occassions',
      screenName: 'GroupOccasionsScreen',
      iconName: 'calendar',
    },
    {
      displayText: 'Members',
      screenName: 'GroupMembersScreen',
      iconName: 'people',
    },
    {
      displayText: 'Invites',
      screenName: 'GroupInvitesScreen',
      iconName: 'people',
    },
    {
      displayText: 'Settings',
      screenName: 'GroupSettingsScreen',
      iconName: 'people',
    },
  ];

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
      {/* TODO Show recent activity feed */}
      <View style={{ margin: 10 }}>
        <Text>Recent Activity</Text>
      </View>
      <FlatList
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].accountBg,
        }}
        data={ITEMS_DATA}
        keyExtractor={(item) => item.screenName}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 20,
                borderRadius: 5,
                backgroundColor: Colors[colorScheme].background,
              }}
              onPress={() =>
                handleNavigation(item.screenName as AvailableScreens)
              }
            >
              <Text>{item.displayText}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
