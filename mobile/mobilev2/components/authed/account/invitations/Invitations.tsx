import React, { useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
import Colors from '../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import { LOAD_INVITES } from '../../../../graphql/queries/invites.query';
import CreateInvite from './CreateInvite';

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

const NoInviteContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 80%;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'InvitationsScreen'>;

const Invitations = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const [showModal, setModal] = useState<boolean>(false);

  const { error, data, loading } = useQuery(LOAD_INVITES);

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
      <Container>
        <Text>Hmm something went wrong...</Text>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (showModal) {
    return (
      <Container>
        <CreateInvite showModal={showModal} setModalVisibility={setModal} />
      </Container>
    );
  }

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
          onPress={() => setModal(true)}
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
      <Content>
        {data.loadMyInvites.length > 0 ? (
          <InviteArray />
        ) : (
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
              onPress={() => setModal(true)}
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
        )}
      </Content>
    </Container>
  );
};

const InviteArray = () => {
  return <Text></Text>;
};

export default Invitations;
