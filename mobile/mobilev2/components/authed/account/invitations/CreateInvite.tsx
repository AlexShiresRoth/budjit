import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import { Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Input from '../../../reusable/Input';

const ModalContainer = styled.View`
  flex: 1;
`;

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
  margin-top: 100px;
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
    <ModalContainer style={{ backgroundColor: Colors[colorScheme].background }}>
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
    </ModalContainer>
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

  const [group, setGroup] = useState({
    groupName: '',
    invites: '',
  });

  const { groupName, invites } = group;

  const handleTextChange = ({ e, name }: { e: string; name: string }) =>
    setGroup({ ...group, [name]: e });

  const handleStepChange = () => {
    if (groupName === '') return;

    setStep((prev: number) => prev + 1);
  };

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
          {step === 1 &&
            'Step 2: Send invites by entering emails, separated by a comma or space'}
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
            value={invites}
            callback={(e) => handleTextChange({ e, name: 'invites' })}
            label="example@gmail.com, example2@yahoo.com"
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
          >
            <Text>Submit</Text>
            <AntDesign name="arrowright" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        )}
      </InputContainer>
    </Content>
  );
};

export default CreateInvite;
