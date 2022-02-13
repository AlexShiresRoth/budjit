import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Input from '../../../reusable/Input';

const ModalView = styled.View`
  flex: 1;
  align-items: center;
`;

const Heading = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;
const HeadingContent = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-color: #ffffff33;
  border-width: 2px;
`;

const Content = styled.View`
  margin-top: 40px;
  justify-content: center;
  width: 90%;
  padding: 30px 0;
`;
const InputContainer = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Switch = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const IconContainer = styled.TouchableOpacity`
  border-radius: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const SearchContent = styled.View`
  width: 90%;
  margin-top: 50px;
`;

const InvitesContainer = styled.View``;

const Invite = styled.View``;

type ModalProps = {
  showModal: boolean;
  setModalVisibility: (val: boolean) => void;
};

type InviteProps = {
  colorScheme: 'light' | 'dark';
  showSearch: boolean;
  setModalVisibility: (val: boolean) => void;
  toggleSearch: (val: boolean) => void;
};

const CreateInvite = ({ showModal, setModalVisibility }: ModalProps) => {
  const colorScheme = useColorScheme();

  const [showSearch, toggleSearch] = useState<boolean>(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setModalVisibility(false)}
      >
        <ModalView style={{ backgroundColor: Colors[colorScheme].background }}>
          <Heading
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme].tint + '80',
            }}
          >
            <HeadingComponent
              toggleSearch={toggleSearch}
              setModalVisibility={setModalVisibility}
              colorScheme={colorScheme}
              showSearch={showSearch}
            />
          </Heading>
          {!showSearch ? (
            <>
              <CreateGroup colorScheme={colorScheme} />
              <ToggleSearchButton
                colorScheme={colorScheme}
                toggleSearch={toggleSearch}
              />
            </>
          ) : (
            <SearchContainer colorScheme={colorScheme} />
          )}
        </ModalView>
      </Modal>
    </ScrollView>
  );
};

const HeadingComponent = ({
  colorScheme,
  showSearch,
  setModalVisibility,
  toggleSearch,
}: InviteProps) => {
  return (
    <HeadingContent>
      {!showSearch ? (
        <>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 16,
            }}
          >
            Send Invites
          </Text>
          <CloseBtn
            onPress={() => setModalVisibility(false)}
            style={{ backgroundColor: Colors[colorScheme].tint }}
          >
            <Text
              style={{
                color: Colors[colorScheme].text,
                marginRight: 10,
              }}
            >
              Close{' '}
            </Text>
            <AntDesign
              name="closecircleo"
              size={14}
              color={Colors[colorScheme].text}
            />
          </CloseBtn>
        </>
      ) : (
        <Row>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => toggleSearch(false)}
          >
            <AntDesign
              name="back"
              color={Colors[colorScheme].text}
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: Colors[colorScheme].text,
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </Row>
      )}
    </HeadingContent>
  );
};

const ToggleSearchButton = ({
  colorScheme,
  toggleSearch,
}: {
  colorScheme: 'light' | 'dark';
  toggleSearch: (val: boolean) => void;
}) => {
  return (
    <InputContainer>
      <Switch
        style={{
          marginTop: 40,
          backgroundColor: Colors[colorScheme].tint + '90',
        }}
        onPress={() => toggleSearch(true)}
      >
        <IconContainer
          style={{
            backgroundColor: Colors[colorScheme].background,
            borderWidth: 1,
            borderColor: Colors[colorScheme].background,
          }}
        >
          <AntDesign
            name="search1"
            color={Colors[colorScheme].tint}
            size={14}
          />
        </IconContainer>
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          Search For An Existing Group
        </Text>
      </Switch>
    </InputContainer>
  );
};

const SearchContainer = ({
  colorScheme,
}: {
  colorScheme: 'light' | 'dark';
}) => {
  return (
    <SearchContent>
      <InputContainer style={{ marginTop: 100, width: '100%' }}>
        <Row>
          <AntDesign
            name="search1"
            color={Colors[colorScheme].text}
            size={20}
          />
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 10,
            }}
          >
            Search My Groups
          </Text>
        </Row>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: Colors[colorScheme].tint,
            marginTop: 10,
            paddingTop: 5,
            paddingBottom: 5,
            color: Colors[colorScheme].text,
          }}
          placeholder="Start Typing..."
          placeholderTextColor={Colors[colorScheme].text + '80'}
          autoFocus={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors[colorScheme].success,
            marginTop: 20,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            alignSelf: 'flex-end',
          }}
        >
          <Text
            style={{ color: Colors[colorScheme].background, fontWeight: '700' }}
          >
            Select
          </Text>
        </TouchableOpacity>
      </InputContainer>
    </SearchContent>
  );
};

const CreateGroup = ({
  colorScheme,
}: {
  colorScheme: InviteProps['colorScheme'];
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

  const handleTextChange = ({ e, name }: { e: string; name: string }) =>
    setGroup({ ...group, [name]: e });

  const handleStepChange = () => {
    if (groupName === '') return;

    setStep((prev: number) => prev + 1);
  };

  const handleAddInvite = async () => {
    if (invite !== '') {
      //add invite to group
      //check if invite already exists
      if (invites.includes(invite)) return;

      const newInvites = [...invites, invite];
      console.log('invites!', newInvites);
      setGroup({ ...group, invites: newInvites });
    }
  };

  const handleSubmit = () => {};

  useEffect(() => {
    //clear added invitee
    setGroup({ ...group, invite: '', ...invites });
  }, [invites]);

  console.log('group[', group, invites);

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
              marginTop: 20,
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
          <InviteGroup invites={invites} colorScheme={colorScheme} />
        </>
      )}
    </Content>
  );
};

const InviteGroup = ({
  invites,
  colorScheme,
}: {
  invites: Array<string>;
  colorScheme: InviteProps['colorScheme'];
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
        </Invite>
      </Row>
    );
  };

  return (
    <InvitesContainer style={{ height: 150 }}>
      <FlatList
        data={invites}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="always"
      />
    </InvitesContainer>
  );
};

export default CreateInvite;
