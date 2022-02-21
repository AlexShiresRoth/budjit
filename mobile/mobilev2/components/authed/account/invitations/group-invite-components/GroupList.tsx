import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import { selectAccount } from '../../../../../redux/reducers/accounts.reducers';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import { View } from '../../../../Themed';
import { useQuery } from '@apollo/client';
import { LOAD_GROUP } from '../../../../../graphql/queries/group.query';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';
import { FontAwesome } from '@expo/vector-icons';

const InviteRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;
const Group = styled.Text`
  font-size: 16px;
`;

const Receiver = styled.Text`
  font-size: 16px;
`;
export type InviteType = {
  receiver: string;
  sender: string;
  status: string;
  groupRef: string;
  _id: string;
};

const GroupList = ({ invites }: { invites: InviteType[] }) => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

  const renderItem = ({ item }: { item: InviteType }) => {
    return <RenderItem item={item} colorScheme={colorScheme} />;
  };

  const Separator = ({ highlighted }: any) => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors[colorScheme].tint + '30',
        }}
      ></View>
    );
  };

  return (
    <FlatList
      data={invites}
      renderItem={renderItem}
      keyExtractor={(invite: InviteType) => invite._id}
      ItemSeparatorComponent={({ highlighted }) => (
        <Separator highlighted={highlighted} />
      )}
    />
  );
};

const RenderItem = ({
  item,
  colorScheme,
}: {
  item: InviteType;
  colorScheme: 'light' | 'dark';
}) => {
  const { error, data, loading } = useQuery(LOAD_GROUP, {
    variables: { input: { groupID: item.groupRef } },
  });

  if (loading) {
    return (
      <InviteRow>
        <Text style={{ color: Colors[colorScheme].text }}>
          Loading Invite...
        </Text>
        <LoadingSpinner />
      </InviteRow>
    );
  }
  return (
    <InviteRow>
      <Group
        style={{
          color: Colors[colorScheme].text,
        }}
      >
        <FontAwesome name="group" color={Colors[colorScheme].text} size={16} />
        {` `}
        Group-
        {data.loadGroup.Group.name}
      </Group>
      <Group
        style={{
          color: Colors[colorScheme].text,
        }}
      ></Group>
      <Receiver style={{ color: Colors[colorScheme].text }}>
        {item.receiver}
      </Receiver>
    </InviteRow>
  );
};

export default GroupList;
