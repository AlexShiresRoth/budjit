import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, TouchableOpacity } from 'react-native';
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

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding: 15px 0;
  border-bottom-width: 1px;
`;

const Column = styled.View`
  flex-direction: row;
`;

const Content = styled.View`
  width: 90%;
  justify-content: center;
  flex: 0.8;
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
  title: string;
};

//TODO Handle submit event!!!
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

  const handleResetOnClose = (value: boolean) => {
    //reset
    setStep(0);
    //revert data
    setData({
      title: '',
      total: '',
      date: new Date().toISOString(),
      accountType: '',
      category: '',
      location: '',
    });
    //and close
    toggleModal(false);
  };

  const submit = () => {
    console.log('data', data);
  };

  const DATA: Array<TransactionInputArrData> = [
    {
      title: 'Transaction',
      component: (
        <StepScreen
          item={{
            name: 'title',
            value: title,
            descriptor: 'What did you purchase?',
            placeholder: 'Transaction',
            inputType: 'text',
            maxStepAmt: 5,
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
      title: 'Location',
      component: (
        <StepScreen
          item={{
            name: 'location',
            value: location,
            descriptor: 'Where was this?',
            placeholder: 'Location',
            inputType: 'text',
            maxStepAmt: 5,
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
      title: 'Total',
      component: (
        <StepScreen
          item={{
            name: 'total',
            value: total,
            descriptor: 'What was the total?',
            placeholder: 'Transaction Amount',
            inputType: 'text',
            maxStepAmt: 5,
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
      title: 'Category',
      component: (
        <StepScreen
          item={{
            name: 'category',
            value: category,
            descriptor: 'ex: food, entertainment, groceries...',
            placeholder: 'Category',
            inputType: 'text',
            maxStepAmt: 5,
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
      title: 'Account Type',
      component: (
        <StepScreen
          item={{
            name: 'accountType',
            value: accountType,
            descriptor: 'Cash, credit, debit, etc...',
            placeholder: 'Account Type',
            inputType: 'text',
            maxStepAmt: 5,
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
      title: 'Date',
      component: (
        <StepScreen
          item={{
            name: 'date',
            value: date,
            descriptor: 'Date of transaction',
            placeholder: 'Transaction Date',
            inputType: 'date',
            maxStepAmt: 5,
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
        onRequestClose={() => handleResetOnClose(false)}
      >
        <ModalView
          style={{
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <ModalInterior>
            <ModalHeader
              style={{ borderBottomColor: Colors[colorScheme].cardBg }}
            >
              <Column style={{ maxWidth: '20%' }}>
                <TouchableOpacity
                  onPress={() => handleResetOnClose(false)}
                  style={{
                    backgroundColor: Colors[colorScheme].danger + '70',
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: Colors[colorScheme].danger,
                  }}
                >
                  <Text
                    style={{ color: Colors[colorScheme].text, fontSize: 12 }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </Column>
              <Column style={{ flexWrap: 'wrap', maxWidth: '80%' }}>
                {DATA.map((obj, index: number) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginRight: 2,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={
                        index < currentStep ? () => setStep(index) : () => {}
                      }
                      key={index}
                    >
                      <Text
                        key={index}
                        style={{
                          color:
                            currentStep >= index
                              ? Colors[colorScheme].tint
                              : Colors[colorScheme].text + '40',
                          fontSize: 12,
                        }}
                      >
                        {obj.title}
                      </Text>
                      {index < DATA.length - 1 ? (
                        <MaterialIcons
                          name="navigate-next"
                          color={
                            currentStep >= index
                              ? Colors[colorScheme].tint
                              : Colors[colorScheme].text + '40'
                          }
                          size={12}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </Column>
            </ModalHeader>
            <Column style={{ width: '90%' }}>
              <Text
                style={{
                  color: Colors[colorScheme].text,
                  fontWeight: '100',
                  fontSize: 20,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                Manually enter new transaction
              </Text>
            </Column>
            {DATA[currentStep]?.component ?? null}
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default ManualTransactionModal;
