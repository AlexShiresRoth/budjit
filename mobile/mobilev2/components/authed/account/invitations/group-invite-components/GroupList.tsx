import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import { selectAccount } from '../../../../../redux/reducers/accounts.reducers';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import { View } from '../../../../Themed';
import { useQuery } from '@apollo/client';
import { LOAD_GROUP } from '../../../../../graphql/queries/group.query';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { FIND_PROFILE_BY_EMAIL } from '../../../../../graphql/queries/profiles.query';

const InviteRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const Text = styled.Text`
  font-size: 16px;
`;
const Column = styled.View`
  flex: 1;
  align-items: center;
`;

const UserColumn = styled.View`
  flex: 1;
  align-items: flex-start;
`;
const Avatar = styled.Image`
  height: 30px;
  width: 30px;
  border-radius: 900px;
  display: flex;
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
      />
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

  console.log('item', item);
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
      <User item={item} colorScheme={colorScheme} />
      <Column>
        <Text
          style={{
            color: `hsla(${Math.random() * 360}, 100%, 70%, 1)`,
            fontWeight: '700',
          }}
        >
          {data.loadGroup.Group.name}
        </Text>
      </Column>

      <Column>
        {item.status === 'pending' ? (
          <MaterialIcons
            name="pending"
            color={Colors[colorScheme].text + '80'}
            size={20}
          />
        ) : (
          <AntDesign
            name="checkcircle"
            color={Colors[colorScheme].success}
            size={20}
          />
        )}
      </Column>
      <Column>
        <TouchableOpacity
          style={{
            borderColor: Colors[colorScheme].danger,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
          }}
        >
          <FontAwesome5
            name="trash"
            size={12}
            color={Colors[colorScheme].text}
          />
        </TouchableOpacity>
      </Column>
    </InviteRow>
  );
};

const User = ({
  item,
  colorScheme,
}: {
  item: InviteType;
  colorScheme: 'light' | 'dark';
}) => {
  const {
    error,
    data: query,
    loading,
  } = useQuery(FIND_PROFILE_BY_EMAIL, {
    variables: { input: { email: item.receiver } },
  });

  console.log('data boyz', query);

  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <UserColumn>
      {query.findProfileByEmail.success ? (
        <Avatar
          source={{
            uri: query.findProfileByEmail.profile.avatar,
          }}
        />
      ) : (
        <Avatar source={{ uri: query.findProfileByEmail.defaultAvatar }} />
      )}
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontSize: 10,
          fontWeight: '700',
        }}
      >
        {item.receiver}
      </Text>
    </UserColumn>
  );
};

export default GroupList;
