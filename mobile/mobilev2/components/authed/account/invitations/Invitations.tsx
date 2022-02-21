import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../../../types';
import Colors from '../../../../constants/Colors';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import { LOAD_OCCASION_INVITES } from '../../../../graphql/queries/invites.query';
import { TouchableOpacity } from 'react-native';
import GroupInvites from './group-invite-components/GroupInvites';
import NoInviteComponent from './NoInviteComponent';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ToggleInviteTypes from './ToggleInviteType';

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

const Invitations = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

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
          backgroundColor: Colors[colorScheme].background,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 2,
            borderColor: Colors[colorScheme].success,
            padding: 5,
          }}
          onPress={() => navigation.navigate('Account')}
        >
          <AntDesign name="back" size={12} color={Colors[colorScheme].text} />
          <Text
            style={{
              color: Colors[colorScheme].text,
              marginLeft: 10,
              fontSize: 12,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
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
          style={{ borderColor: Colors[colorScheme].text, borderWidth: 1 }}
          onPress={() => setModal({ type: 'group', show: true })}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 12,
            }}
          >
            New
          </Text>
          <AntDesign
            name="pluscircleo"
            color={Colors[colorScheme].text}
            size={12}
            style={{ marginLeft: 10 }}
          />
        </CreateButton>
      </Heading>
      <ToggleInviteTypes
        colorScheme={colorScheme}
        currentInviteType={'group'}
        navigation={navigation}
        route={route}
      />
      <Content>
        <GroupInvites
          showModal={setModal}
          modal={modal}
          inviteType={'group'}
          navigation={navigation}
          route={route}
        />
      </Content>
    </Container>
  );
};

export default Invitations;
