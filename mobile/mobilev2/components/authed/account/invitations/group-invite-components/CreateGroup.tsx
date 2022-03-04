import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../../../constants/Colors';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Input from '../../../../reusable/Input';
import { useMutation } from '@apollo/client';
import { SEND_INVITES_TO_NEW_GROUP } from '../../../../../graphql/mutations/invites.mutations';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';

const Content = styled.View`
  margin-top: 40px;
  justify-content: center;
  width: 90%;
  padding: 60px 0;
`;
const InputContainer = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

type InviteProps = {
  colorScheme: 'light' | 'dark';
  showSearch: boolean;
  setModalVisibility: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  toggleSearch: (val: boolean) => void;
};

const CreateGroup = ({
  colorScheme,
  setModalVisibility,
}: {
  colorScheme: InviteProps['colorScheme'];
  setModalVisibility: InviteProps['setModalVisibility'];
}) => {
  const [step, setStep] = useState<number>(0);

  const [group, setGroup] = useState<{
    groupName: string;
    invite: string;
    invites: Array<string>;
  }>({
    groupName: '',
    invite: '',
    invites: [],
  });

  const { groupName, invites, invite } = group;

  const [sendInvites, { error, data, loading }] = useMutation(
    SEND_INVITES_TO_NEW_GROUP,
  );
  const handleTextChange = ({ e, name }: { e: string; name: string }) =>
    setGroup({ ...group, [name]: e });

  const handleStepChange = () => {
    if (groupName === '') return;

    setStep((prev: number) => prev + 1);
  };

  const handleAddInvite = () => {
    if (invite !== '') {
      //add invite to group
      //check if invite already exists
      if (invites.includes(invite)) return;

      const newInvites = [...invites, invite];

      setGroup({ ...group, invites: newInvites });
    }
  };

  //removes invite from local state NOT db obvi
  const handleRemoveInvite = (invite: string) => {
    return setGroup((prevState) => ({
      ...prevState,
      invites: [...invites].filter(
        (existingInvite: string) => existingInvite !== invite,
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      const request = await sendInvites({
        variables: {
          sendInvitesInput: { groupName, invites },
        },
      });

      if (request.data.sendInvitesToNewGroup.success) {
        console.log('success', request);
        setModalVisibility({ type: 'group', show: false });
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    //clear added invitee
    setGroup({ ...group, invite: '', ...invites });
  }, [invites]);

  console.log('data', data, 'error', error, 'loading', loading);

  if (error) {
    return (
      <Content
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: '700',
            fontSize: 20,
          }}
        >
          Hmm something went wrong creating invites...
          {error.message}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors[colorScheme].danger,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: Colors[colorScheme].background,
          }}
          onPress={() => setStep(0)}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 20,
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </Content>
    );
  }

  if (loading) {
    return (
      <Content
        style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: '700',
            fontSize: 20,
          }}
        >
          Sending invites to new group...
        </Text>
        <LoadingSpinner />
      </Content>
    );
  }

  return (
    <Content
      style={{
        borderBottomColor: Colors[colorScheme].tint + '50',
        borderWidth: 1,
      }}
    >
      {/* STEP 1 */}
      <InputContainer>
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            {step === 0 && 'Create A New Group'}
            {step === 1 && 'Send Invites'}
          </Text>

          {step === 1 && (
            <TouchableOpacity
              onPress={() => setStep(0)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <AntDesign
                name="back"
                color={Colors[colorScheme].text}
                size={20}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: Colors[colorScheme].text }}>Back</Text>
            </TouchableOpacity>
          )}
        </Row>
        <Text
          style={{
            color: Colors[colorScheme].text + '90',
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          {step === 0 && 'Step 1: Name The Group'}
          {step === 1 && 'Step 2: Send invites by entering emails'}
        </Text>
        {step === 0 && (
          <Input
            value={groupName}
            callback={(e) => handleTextChange({ e, name: 'groupName' })}
            label="Name Group"
            isSecure={false}
            icon={
              <AntDesign
                name="addusergroup"
                size={20}
                color={Colors[colorScheme].tint}
              />
            }
            color={Colors[colorScheme].tint}
            style={{
              placeholderColor: '#eeeeee22',
              color: '#eeeeee22',
            }}
          />
        )}
        {step === 1 && (
          <Input
            value={invite}
            callback={(e) => handleTextChange({ e, name: 'invite' })}
            label="example@gmail.com"
            isSecure={false}
            icon={
              <AntDesign
                name="addusergroup"
                size={20}
                color={Colors[colorScheme].tint}
              />
            }
            color={Colors[colorScheme].tint}
            style={{
              placeholderColor: '#eeeeee22',
              color: '#eeeeee22',
            }}
          />
        )}
        {step === 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: Colors[colorScheme].success,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 5,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: Colors[colorScheme].background,
            }}
            onPress={() => handleStepChange()}
          >
            <Text>Next</Text>
            <AntDesign name="arrowright" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        )}
        {step === 1 && (
          <Row style={{ justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors[colorScheme].secondary,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: Colors[colorScheme].background,
              }}
              onPress={() => handleAddInvite()}
            >
              <Text style={{ color: Colors[colorScheme].text }}>Add</Text>
              <AntDesign
                name="plus"
                style={{ marginLeft: 10 }}
                color={Colors[colorScheme].text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors[colorScheme].success,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: Colors[colorScheme].background,
              }}
              onPress={() => handleSubmit()}
            >
              <Text>Submit</Text>
              <AntDesign name="arrowright" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </Row>
        )}
      </InputContainer>
      {invites.length > 0 && step === 1 && (
        <>
          <Row
            style={{
              marginTop: 30,
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme].tint + '30',
              paddingBottom: 10,
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{ color: Colors[colorScheme].text, fontWeight: '700' }}
            >
              Current Invites
            </Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              People: {invites.length}
            </Text>
          </Row>
          <InviteGroup
            invites={invites}
            colorScheme={colorScheme}
            handleRemoveInvite={handleRemoveInvite}
          />
        </>
      )}
    </Content>
  );
};

const InvitesContainer = styled.View``;

const Invite = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const InviteGroup = ({
  invites,
  colorScheme,
  handleRemoveInvite,
}: {
  invites: Array<string>;
  colorScheme: InviteProps['colorScheme'];
  handleRemoveInvite: (val: string) => void;
}) => {
  const renderItem = ({ item }: any) => {
    return (
      <Row
        style={{
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: Colors[colorScheme].tint + '60',
          padding: 10,
        }}
      >
        <AntDesign
          name="user"
          color={Colors[colorScheme].tint}
          style={{ marginRight: 10 }}
        />
        <Invite>
          <Text style={{ color: Colors[colorScheme].text }}>{item}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors[colorScheme].danger,
              height: 25,
              width: 25,
              borderRadius: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => handleRemoveInvite(item)}
          >
            <FontAwesome
              name="trash-o"
              color={Colors[colorScheme].text}
              size={16}
            />
          </TouchableOpacity>
        </Invite>
      </Row>
    );
  };

  return (
    <InvitesContainer
      style={{
        maxHeight: 150,
        backgroundColor: Colors[colorScheme].tint + '30',
        padding: 10,
        borderRadius: 5,
      }}
    >
      <FlatList
        data={invites}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="always"
      />
    </InvitesContainer>
  );
};

export default CreateGroup;
