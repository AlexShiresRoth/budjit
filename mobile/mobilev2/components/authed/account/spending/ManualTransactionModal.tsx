import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, FlatList, Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import {
  Feather,
  EvilIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import PrimaryButton from '../../../reusable/PrimaryButton';
const ModalContainer = styled.View`
  flex: 1;
`;
const ModalView = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;
const ModalInterior = styled.View`
  width: 90%;
  padding: 30px 0;
`;

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.View`
  width: 100%;
  align-items: flex-start;
`;

const Text = styled.Text``;

type Props = {
  isModalVisible: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  category: string;
  total: number | string;
  date: string;
  accountType: string;
  location: string;
};

type ArrData = {
  name: string;
  value: string | number;
  descriptor: string;
  icon: React.ReactElement;
  placeholder: string;
};

//TODO finish input styling
const ManualTransactionModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  //change step for creating a transaction
  const [currentStep, setStep] = useState<number>(0);

  const [data, setData] = useState<FormData>({
    title: '',
    total: '',
    date: '',
    accountType: '',
    category: '',
    location: '',
  });

  const { title, date, accountType, category, location, total } = data;

  const handleTextChange = (name: string, text: string) =>
    setData({ ...data, [name]: text });

  const handleCloseModal = (value: boolean) => {
    //reset
    setStep(0);
    //and close
    toggleModal(false);
  };

  const submit = () => {
    console.log('data', data);
  };

  console.log('data', data);

  const DATA: Array<ArrData> = [
    {
      name: 'title',
      value: title,
      descriptor: 'What did you purchase?',
      placeholder: 'Transaction',
      icon: (
        <FontAwesome
          name="shopping-bag"
          color={Colors[colorScheme].tint}
          size={20}
        />
      ),
    },
    {
      name: 'location',
      value: location,
      descriptor: 'Where was this?',
      placeholder: 'Location',
      icon: (
        <Ionicons
          name="location-sharp"
          color={Colors[colorScheme].tint}
          size={28}
        />
      ),
    },
    {
      name: 'total',
      value: total,
      descriptor: 'What was the total?',
      placeholder: 'Transaction Amount',
      icon: (
        <MaterialIcons
          name="attach-money"
          color={Colors[colorScheme].tint}
          size={26}
        />
      ),
    },
    {
      name: 'category',
      value: category,
      descriptor: 'ex: food, entertainment, groceries...',
      placeholder: 'Category',
      icon: (
        <Ionicons
          name="fast-food-sharp"
          color={Colors[colorScheme].tint}
          size={26}
        />
      ),
    },
    {
      name: 'accountType',
      value: accountType,
      descriptor: 'Cash, credit, debit, etc...',
      placeholder: 'Account Type',
      icon: (
        <MaterialCommunityIcons
          name="credit-card-multiple"
          color={Colors[colorScheme].tint}
          size={26}
        />
      ),
    },
    {
      name: 'date',
      value: date,
      descriptor: 'Date of transaction',
      placeholder: 'Date',
      icon: (
        <Ionicons
          name="md-calendar-sharp"
          color={Colors[colorScheme].tint}
          size={26}
        />
      ),
    },
  ];

  if (!isModalVisible) {
    return null;
  }
  return (
    <ModalContainer>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => handleCloseModal(false)}
      >
        <ModalView
          style={{
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <ModalInterior>
            <Row style={{ marginBottom: 20 }}>
              <Text style={{ color: Colors[colorScheme].text }}>
                Manually enter a new transaction
              </Text>
              <Button
                title="close"
                onPress={() => handleCloseModal(false)}
                color={Colors[colorScheme].danger}
              ></Button>
            </Row>

            <StepScreen
              item={DATA[currentStep]}
              handleTextChange={handleTextChange}
              setStep={setStep}
              currentStep={currentStep}
            />
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

const StepScreen = ({
  item,
  handleTextChange,
  setStep,
  currentStep,
}: {
  item: ArrData;
  handleTextChange: (name: string, event: string) => void;
  setStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
}) => {
  const colorScheme = useColorScheme();

  const [valueEntered, toggleValue] = useState<boolean>(false);

  const handleValueChange = () =>
    item.value !== '' ? toggleValue(true) : toggleValue(false);

  useEffect(() => {
    handleValueChange();
  }, [item.value]);

  return (
    <Column
      style={{
        marginTop: 40,
        marginBottom: 15,
        height: '70%',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontSize: 50,
          backgroundColor: Colors[colorScheme].background,
        }}
      >
        Step {currentStep + 1}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme].text + '90',
          fontSize: 20,
          backgroundColor: Colors[colorScheme].background,
        }}
      >
        {item.placeholder}
      </Text>
      <Row
        style={{
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'flex-start',
          borderWidth: 1,
          borderColor: Colors[colorScheme].tint,
          borderRadius: 5,
          padding: 15,
        }}
      >
        {item.icon}
        <TextInput
          value={item.value.toString()}
          onChangeText={(e) => handleTextChange(item.name, e)}
          placeholder={item.descriptor}
          placeholderTextColor={Colors[colorScheme].text + '60'}
          style={{ marginLeft: 10, color: Colors[colorScheme].text }}
        />
      </Row>
      {valueEntered ? (
        <PrimaryButton
          buttonText="Next"
          buttonTextColor={Colors[colorScheme].text}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        />
      ) : (
        <PrimaryButton
          buttonText="Next"
          buttonTextColor={Colors[colorScheme].text + '80'}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          colorArr={[
            Colors[colorScheme].tint + '40',
            Colors[colorScheme].tint + '40',
          ]}
        />
      )}
    </Column>
  );
};

export default ManualTransactionModal;
