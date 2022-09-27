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
import { FontAwesome } from '@expo/vector-icons';
import GroupActivity from './group-recent-activity/GroupActivity';

type Navigation = NativeStackScreenProps<GroupStackParamList, 'GroupScreen'>;

type ScreenItemsType = Array<{
  displayText: string;
  screenName: string;
  iconName: 'calendar' | 'group' | 'envelope' | 'gear' | 'dollar';
}>;

type AvailableScreens =
  | 'GroupOccasionsScreen'
  | 'GroupMembersScreen'
  | 'GroupSettingsScreen'
  | 'GroupInvitesScreen'
  | 'GroupTransactionsScreen';

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
      displayText: 'Transactions',
      screenName: 'GroupTransactionsScreen',
      iconName: 'dollar',
    },
    {
      displayText: 'Occassions',
      screenName: 'GroupOccasionsScreen',
      iconName: 'calendar',
    },
    {
      displayText: 'Members',
      screenName: 'GroupMembersScreen',
      iconName: 'group',
    },
    {
      displayText: 'Invites',
      screenName: 'GroupInvitesScreen',
      iconName: 'envelope',
    },
    {
      displayText: 'Settings',
      screenName: 'GroupSettingsScreen',
      iconName: 'gear',
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
      <GroupActivity groupUpdates={data?.loadGroup?.Group?.updates} />
      <FlatList
        style={{
          paddingTop: 5,
          paddingBottom: 5,
        }}
        data={ITEMS_DATA}
        keyExtractor={(item) => item.screenName}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: Colors[colorScheme].accountBg,
            }}
          />
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                padding: 20,
                backgroundColor: Colors[colorScheme].background,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                handleNavigation(item.screenName as AvailableScreens)
              }
            >
              <FontAwesome
                name={item.iconName}
                color={Colors[colorScheme].tint}
                style={{ marginRight: 10 }}
                size={16}
              />
              <Text style={{ fontSize: 16 }}>{item.displayText}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
