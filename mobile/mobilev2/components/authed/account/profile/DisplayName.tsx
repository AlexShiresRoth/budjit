import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { connect, RootStateOrAny } from 'react-redux';
import { AccountTypes } from '../../../../types/RootState.types';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../../../graphql/mutations/profiles.mutations';

const Column = styled.View``;
const ProfileName = styled.Text`
  font-weight: 700;
  font-size: 22px;
`;

const Span = styled.Text`
  font-weight: 500;
  font-size: 14px;
`;
const ProfileRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2px;
  padding-bottom: 10px;
`;

const Input = styled.TextInput``;

const EditButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
`;
const SaveButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20%;
`;

const CancelButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
`;

type ColorScheme = { colorScheme: 'light' | 'dark' };

type Name = { name: string };

type EditableFunc = { toggleEvent: Dispatch<SetStateAction<boolean>> };

type SetNameState = { editEvent: Dispatch<SetStateAction<string>> };

type UpdateProps = { handleProfileUpdate: ({ ...args }) => void };
//TODO finish edit mutation by reloading account and showing updated name!
const DisplayName = ({ name, accounts }: Name & AccountTypes) => {
  const colorScheme = useColorScheme();

  const { myAccount } = accounts;

  const [editable, toggleEdit] = useState<boolean>(false);

  const [newName, setName] = useState<string>('');

  const [updateProfile, { error, data, loading }] = useMutation(UPDATE_PROFILE);

  console.log('accoutns', accounts, error, newName, myAccount?.profile);

  const handleProfileUpdate = async () => {
    try {
      const response = await updateProfile({
        variables: {
          updateProfileInput: {
            name: newName,
            avatar: null,
            profileId: myAccount?.profile,
          },
        },
      });
      console.log('response', response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileRow
      style={{
        borderColor: Colors[colorScheme].tint + '55',
        marginTop: '7%',
      }}
    >
      <Column>
        <Span style={{ color: Colors[colorScheme].text + '90' }}>
          Display Name
        </Span>
        {!editable ? (
          <ProfileName style={{ color: Colors[colorScheme].text }}>
            {name && name}
          </ProfileName>
        ) : (
          <Editable
            name={name}
            colorScheme={colorScheme}
            newName={newName}
            editEvent={setName}
          />
        )}
      </Column>
      <Column>
        <EditDisplayNameButton
          colorScheme={colorScheme}
          toggleEvent={toggleEdit}
          editable={editable}
          handleProfileUpdate={handleProfileUpdate}
        />
      </Column>
    </ProfileRow>
  );
};

const EditDisplayNameButton = ({
  colorScheme,
  toggleEvent,
  editable,
  handleProfileUpdate,
}: ColorScheme & EditableFunc & { editable: boolean } & UpdateProps) => {
  return (
    <Column
      style={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {!editable ? (
        <EditButton onPress={() => toggleEvent(true)}>
          <Text
            style={{
              color: Colors[colorScheme].text,
              marginRight: 5,
              fontSize: 14,
            }}
          >
            Edit
          </Text>
          <FontAwesome5 name="edit" color="#fefefe" />
        </EditButton>
      ) : (
        <Buttons>
          <SaveButton
            style={{
              backgroundColor: Colors[colorScheme].success,
              padding: 5,
              borderRadius: 5,
            }}
            onPress={handleProfileUpdate}
          >
            <FontAwesome name="save" color="#111122" size={20} />
          </SaveButton>
          <CancelButton
            onPress={() => toggleEvent(false)}
            style={{
              backgroundColor: Colors[colorScheme].danger,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="cancel-presentation"
              color="#111122"
              size={20}
            />
          </CancelButton>
        </Buttons>
      )}
    </Column>
  );
};

const Editable = ({
  name,
  newName,
  colorScheme,
  editEvent,
}: Name & ColorScheme & { newName: string } & SetNameState) => {
  return (
    <Input
      placeholder={name}
      value={newName}
      defaultValue={name}
      placeholderTextColor={Colors[colorScheme].text}
      style={{
        color: Colors[colorScheme].text,
        fontSize: 22,
        fontWeight: '700',
      }}
      autoFocus={true}
      onChangeText={(e) => editEvent(e)}
    />
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, {})(DisplayName);
