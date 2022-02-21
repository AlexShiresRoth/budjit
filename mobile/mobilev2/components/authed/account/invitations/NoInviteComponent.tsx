import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';

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

export default NoInviteComponent;
