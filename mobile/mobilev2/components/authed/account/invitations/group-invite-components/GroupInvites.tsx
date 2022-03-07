import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';
import { LOAD_SENT_GROUP_INVITES } from '../../../../../graphql/queries/invites.query';
import CreateInvite from '../group-invite-components/CreateInvite';
import { TouchableOpacity } from 'react-native';
import GroupList from '../group-invite-components/GroupList';
import NoInviteComponent from '../NoInviteComponent';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../../../types';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const Text = styled.Text``;

type NavProps = BottomTabScreenProps<
  RootTabParamList,
  'InvitationsScreen' | 'SentGroupInvites' | 'ReceivedGroupInvites'
>;

const GroupInvites = ({
  modal,
  showModal,
  inviteType,
  navigation,
  route,
}: {
  modal: { type: 'group' | 'occasion'; show: boolean };
  showModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  inviteType: 'group' | 'occasion';
} & NavProps) => {
  if (modal.type === 'group' && modal.show) {
    return (
      <Container>
        <CreateInvite showModal={modal.show} setModalVisibility={showModal} />
      </Container>
    );
  }
  if (route.name === 'SentGroupInvites') {
    return <SentInvites showModal={showModal} inviteType={inviteType} />;
  }

  return <></>;
};

const SentInvites = ({
  showModal,
  inviteType,
}: {
  showModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  inviteType: 'group' | 'occasion';
}) => {
  const colorScheme = useColorScheme();

  const { error, data, loading, refetch } = useQuery(LOAD_SENT_GROUP_INVITES);

  useEffect(() => {
    //reload on component load and update
    refetch();
  }, []);

  if (loading) {
    return (
      <Container>
        <Text style={{ color: Colors[colorScheme].text }}>
          Loading Invites...
        </Text>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 20,
          }}
        >
          Hmm something went wrong...
        </Text>
        <Text style={{ color: Colors[colorScheme].text + '90' }}>
          {error.message}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            backgroundColor: Colors[colorScheme].tint,
            padding: 10,
            marginTop: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: Colors[colorScheme].text }}>Reload</Text>
        </TouchableOpacity>
      </Container>
    );
  }

  if (data && data.loadSentGroupInvites.groupInvites.length === 0) {
    return (
      <NoInviteComponent
        setModal={showModal}
        inviteType={inviteType}
        colorScheme={colorScheme}
      />
    );
  }

  return (
    <GroupList
      invites={data.loadSentGroupInvites.groupInvites}
      refetch={refetch}
    />
  );
};

export default GroupInvites;
