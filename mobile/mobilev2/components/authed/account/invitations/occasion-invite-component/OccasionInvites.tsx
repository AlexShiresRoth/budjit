import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../../hooks/useColorScheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../../../../types';
import Colors from '../../../../../constants/Colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';
import { LOAD_OCCASION_INVITES } from '../../../../../graphql/queries/invites.query';
import { TouchableOpacity } from 'react-native';
import GroupInvites from '../group-invite-components/GroupInvites';
import NoInviteComponent from '../NoInviteComponent';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ToggleInviteTypes from '../ToggleInviteType';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const Heading = styled.View`
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Content = styled.View``;

const Text = styled.Text``;

const CreateButton = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`;

type Props = BottomTabScreenProps<RootTabParamList, 'InvitationsScreen'>;

const OccasionInvites = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const [modal, setModal] = useState<{
    type: 'occasion' | 'group';
    show: boolean;
  }>({
    type: 'occasion',
    show: false,
  });

  return (
    <Container>
      <Heading
        style={{
          backgroundColor: Colors[colorScheme].tint,
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: '700',
            fontSize: 16,
          }}
        >
          My Invites
        </Text>
        <CreateButton
          style={{ borderColor: Colors[colorScheme].text, borderWidth: 2 }}
          onPress={() => setModal({ type: 'occasion', show: true })}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 15,
            }}
          >
            New
          </Text>
          <AntDesign
            name="pluscircleo"
            color={Colors[colorScheme].text}
            size={15}
            style={{ marginLeft: 10 }}
          />
        </CreateButton>
      </Heading>
      <ToggleInviteTypes
        colorScheme={colorScheme}
        navigation={navigation}
        route={route}
        currentInviteType="occasion"
      />
      <Content>
        <Invites showModal={setModal} modal={modal} />
      </Content>
    </Container>
  );
};

const Invites = ({
  modal,
  showModal,
}: {
  modal: { type: 'occasion' | 'group'; show: boolean };
  showModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
}) => {
  const colorScheme = useColorScheme();

  const { error, data, loading, refetch } = useQuery(LOAD_OCCASION_INVITES);

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

  if (modal.show && modal.type === 'occasion') {
    return <Container></Container>;
  }

  if (data.loadMyInvites.length === 0) {
    return (
      <NoInviteComponent
        setModal={showModal}
        inviteType={'occasion'}
        colorScheme={colorScheme}
      />
    );
  }
  return <></>;
};

export default OccasionInvites;
