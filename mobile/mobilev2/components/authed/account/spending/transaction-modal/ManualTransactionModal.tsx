import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import StepScreen from './StepScreen';

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

export type TransactionInputArrData = {
  component: React.ReactNode;
};

//TODO finish input styling
const ManualTransactionModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  //change step for creating a transaction
  const [currentStep, setStep] = useState<number>(0);

  const [data, setData] = useState<FormData>({
    title: '',
    total: '',
    date: new Date().toISOString(),
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

  const DATA: Array<TransactionInputArrData> = [
    {
      component: (
        <StepScreen
          item={{
            name: 'title',
            value: title,
            descriptor: 'What did you purchase?',
            placeholder: 'Transaction',
            inputType: 'text',
            icon: (
              <FontAwesome
                name="shopping-bag"
                color={Colors[colorScheme].tint}
                size={20}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      component: (
        <StepScreen
          item={{
            name: 'location',
            value: location,
            descriptor: 'Where was this?',
            placeholder: 'Location',
            inputType: 'text',
            icon: (
              <Ionicons
                name="location-sharp"
                color={Colors[colorScheme].tint}
                size={28}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      component: (
        <StepScreen
          item={{
            name: 'total',
            value: total,
            descriptor: 'What was the total?',
            placeholder: 'Transaction Amount',
            inputType: 'text',
            icon: (
              <MaterialIcons
                name="attach-money"
                color={Colors[colorScheme].tint}
                size={26}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      component: (
        <StepScreen
          item={{
            name: 'category',
            value: category,
            descriptor: 'ex: food, entertainment, groceries...',
            placeholder: 'Category',
            inputType: 'text',
            icon: (
              <Ionicons
                name="fast-food-sharp"
                color={Colors[colorScheme].tint}
                size={26}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      component: (
        <StepScreen
          item={{
            name: 'accountType',
            value: accountType,
            descriptor: 'Cash, credit, debit, etc...',
            placeholder: 'Account Type',
            inputType: 'text',
            icon: (
              <MaterialCommunityIcons
                name="credit-card-multiple"
                color={Colors[colorScheme].tint}
                size={26}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
        />
      ),
    },
    {
      component: (
        <StepScreen
          item={{
            name: 'date',
            value: date,
            descriptor: 'Date of transaction',
            placeholder: 'Date',
            inputType: 'date',
            icon: (
              <Ionicons
                name="md-calendar-sharp"
                color={Colors[colorScheme].tint}
                size={26}
              />
            ),
          }}
          handleTextChange={handleTextChange}
          setStep={setStep}
          currentStep={currentStep}
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

            {DATA[currentStep]?.component ?? null}
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default ManualTransactionModal;
