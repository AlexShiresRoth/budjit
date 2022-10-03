import { useQuery } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import { FETCH_GROUP_INVITES } from '../../../../graphql/queries/group.query';
import useColorScheme from '../../../../hooks/useColorScheme';
import Skeleton from '../../../reusable/Skeleton';
import ExternalInvite from './ExternalInvite';
import InternalInviteCard from './InternalInviteCard';
import NewInviteModal from './NewInviteModal';

type Props = {
  groupInvites: Array<any>;
  groupId: string;
};

type Invite = {
  item: { _id: string; type: string };
};

//TODO need to add create new invite modal
//TODO need to add view invite modal with possibility to delete invite if status is pending
const AllInvitesList = ({ groupInvites, groupId }: Props) => {
  const colorScheme = useColorScheme();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleResetOnClose = () => {
    setIsModalVisible(false);
  };

  const renderItem = ({ item }: Invite) => {
    return item.type === 'internal' ? (
      <InternalInviteCard key={item?._id} item={item} />
    ) : (
      <ExternalInvite key={item._id} item={item} />
    );
  };
  return (
    <>
      <NewInviteModal
        isModalVisible={isModalVisible}
        handleResetOnClose={handleResetOnClose}
        groupId={'1'}
      />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
            marginBottom: 10,
            backgroundColor: Colors[colorScheme].tint,
          }}
        >
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Colors[colorScheme].background,
                fontWeight: '700',
                fontSize: 20,
              }}
            >
              All invites
            </Text>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: Colors[colorScheme].background + '20',
              }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={{ color: Colors[colorScheme].background }}>
                <FontAwesome name="plus" /> New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={groupInvites}
          renderItem={renderItem}
          style={{ width: '90%', marginBottom: 180 }}
        />
      </View>
    </>
  );
};

export default AllInvitesList;
