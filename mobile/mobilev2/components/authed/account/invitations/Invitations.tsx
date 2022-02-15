import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
import Colors from '../../../../constants/Colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import { LOAD_INVITES } from '../../../../graphql/queries/invites.query';
import CreateInvite from './group-invite-components/CreateInvite';
import { TouchableOpacity } from 'react-native';

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

const ToggleHeading = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
`;

const ToggleHeadingColumn = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View``;

const Text = styled.Text``;

const CreateButton = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`;

const NoInviteContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 80%;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'InvitationsScreen'>;

const Invitations = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const [inviteType, setInviteType] = useState<'group' | 'occasion'>('group');

  const [modal, setModal] = useState<{
    type: 'group' | 'occasion';
    show: boolean;
  }>({
    type: 'group',
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
          onPress={
            inviteType === 'group'
              ? () => setModal({ type: 'group', show: true })
              : () => setModal({ type: 'occasion', show: true })
          }
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
        toggleInviteType={setInviteType}
        currentInviteType={inviteType}
      />
      <Content>
        {inviteType === 'group' ? (
          <GroupInvites
            showModal={setModal}
            modal={modal}
            inviteType={inviteType}
          />
        ) : (
          <OccasionInvites
            showModal={setModal}
            modal={modal}
            inviteType={inviteType}
          />
        )}
      </Content>
    </Container>
  );
};

const ToggleInviteTypes = ({
  colorScheme,
  toggleInviteType,
  currentInviteType,
}: {
  colorScheme: 'light' | 'dark';
  toggleInviteType: Dispatch<SetStateAction<'group' | 'occasion'>>;
  currentInviteType: 'group' | 'occasion';
}) => {
  return (
    <ToggleHeading
      style={{
        borderBottomColor: Colors[colorScheme].tint + '90',
      }}
    >
      <ToggleHeadingColumn
        style={{
          backgroundColor:
            currentInviteType === 'group'
              ? Colors[colorScheme].tint
              : Colors[colorScheme].secondary,
          paddingTop: 20,
          paddingBottom: 20,
          borderRightWidth: 0.2,
          borderRightColor: Colors[colorScheme].tint + '90',
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].tint,
        }}
        onPress={() => toggleInviteType('group')}
      >
        {currentInviteType === 'group' && (
          <Feather
            name="chevrons-right"
            color={Colors[colorScheme].success}
            size={20}
          />
        )}
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginLeft: 10,
          }}
        >
          Groups
        </Text>
      </ToggleHeadingColumn>
      <ToggleHeadingColumn
        style={{
          backgroundColor:
            currentInviteType === 'occasion'
              ? Colors[colorScheme].tint
              : Colors[colorScheme].secondary,
          paddingBottom: 20,
          paddingTop: 20,
          borderLeftWidth: 0.2,
          borderLeftColor: Colors[colorScheme].tint + '90',
        }}
        onPress={() => toggleInviteType('occasion')}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginRight: 10,
          }}
        >
          Occasions
        </Text>
        {currentInviteType === 'occasion' && (
          <Feather
            name="chevrons-left"
            color={Colors[colorScheme].success}
            size={20}
          />
        )}
      </ToggleHeadingColumn>
    </ToggleHeading>
  );
};

const GroupInvites = ({
  modal,
  showModal,
  inviteType,
}: {
  modal: { type: 'group' | 'occasion'; show: boolean };
  showModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  inviteType: 'group' | 'occasion';
}) => {
  const colorScheme = useColorScheme();

  const { error, data, loading, refetch } = useQuery(LOAD_INVITES);

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

  if (modal.type === 'group' && modal.show) {
    return (
      <Container>
        <CreateInvite showModal={modal.show} setModalVisibility={showModal} />
      </Container>
    );
  }

  if (data.loadMyInvites.length === 0) {
    return (
      <NoInviteComponent
        setModal={showModal}
        inviteType={inviteType}
        colorScheme={colorScheme}
      />
    );
  }
  return <></>;
};

const OccasionInvites = ({
  modal,
  showModal,
  inviteType,
}: {
  modal: { type: 'group' | 'occasion'; show: boolean };
  showModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  inviteType: 'group' | 'occasion';
}) => {
  const colorScheme = useColorScheme();

  const { error, data, loading, refetch } = useQuery(LOAD_INVITES);

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
  return <></>;
};

const NoInviteComponent = ({
  colorScheme,
  setModal,
  inviteType,
}: {
  inviteType: 'group' | 'occasion';
  colorScheme: 'light' | 'dark';
  setModal: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
}) => {
  return (
    <NoInviteContainer>
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontWeight: '700',
          fontSize: 30,
        }}
      >
        No Invites yet!
      </Text>
      <CreateButton
        style={{
          backgroundColor: Colors[colorScheme].tint,
          marginTop: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 10,
          paddingLeft: 10,
        }}
        onPress={() =>
          setModal({
            type: inviteType,
            show: true,
          })
        }
      >
        <Text
          style={{
            color: Colors[colorScheme].background,
            fontWeight: '100',
          }}
        >
          Send Invites
        </Text>
      </CreateButton>
    </NoInviteContainer>
  );
};

export default Invitations;
