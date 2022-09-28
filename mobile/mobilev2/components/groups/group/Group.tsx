import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import Skeleton from '../../reusable/Skeleton';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectUpdateState,
  setShouldRefreshGroup,
} from '../../../redux/reducers/updates.reducers';

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

  //get state of updates and trigger a reload for group.
  const { shouldRefreshGroup } = useAppSelector(selectUpdateState);

  const dispatch = useAppDispatch();

  //fetch the group with provided id
  const { error, data, loading, refetch } = useQuery(LOAD_GROUP, {
    variables: { input: { groupID } },
  });

  const handleNavigation = (screenName: AvailableScreens) =>
    navigation.navigate(screenName, {
      groupId: groupID,
    });

  const handleRefresh = async (): Promise<void> => {
    try {
      if (shouldRefreshGroup) {
        //refetch group when update occurs
        await refetch();
        //trigger should become false on successful update
        dispatch(setShouldRefreshGroup(false));
        console.log(
          '///////////////////HAPPEN ONLY ONCE//////////////////////',
        );
      }
    } catch (error) {
      console.error(error);
      //trigger should become false on unsuccessful update to limit refetching
      setShouldRefreshGroup(false);
    }
  };

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

  //want to refetch group on certain events
  //What are those events?
  useEffect(() => {
    handleRefresh();
  }, [shouldRefreshGroup]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ width: '90%' }}>
          <Skeleton verticalBars={4} />
        </View>
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
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 120,
          backgroundColor: '#333',
          width: '100%',
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
      {/* RECENT ACTIVITY FEED */}
      <GroupActivity groupUpdates={data?.loadGroup?.Group?.updates} />
      <FlatList
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          width: '90%',
        }}
        data={ITEMS_DATA}
        keyExtractor={(item) => item.screenName}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                padding: 20,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: Colors[colorScheme].background,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 5,
              }}
              onPress={() =>
                handleNavigation(item.screenName as AvailableScreens)
              }
            >
              <FontAwesome
                name={item.iconName}
                color={Colors[colorScheme].tint}
                style={{ marginRight: 10 }}
                size={14}
              />
              <Text style={{ fontSize: 16 }}>{item.displayText}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
