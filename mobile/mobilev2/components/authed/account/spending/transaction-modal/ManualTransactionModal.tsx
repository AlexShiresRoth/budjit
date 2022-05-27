import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Input from '../../../../reusable/Input';
import TransactionInputList from './TransactionInputList';
import DatePickerModal from '../../../../reusable/DatePickerModal';
import PrimaryButton from '../../../../reusable/PrimaryButton';
import { useMutation } from '@apollo/client';
import { CREATE_TRANSACTION } from '../../../../../graphql/mutations/spending.mutation';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';

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

const Row = styled.View`
  flex-direction: row;
`;

const Column = styled.View``;

const Content = styled.View`
  width: 90%;
  justify-content: center;
  flex: 0.8;
`;

const Text = styled.Text``;

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-right-width: 1.4px;
  margin-right: 10px;
  width: 50px;
`;

const DateContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-width: 1.4px;
  padding: 5px;
  border-radius: 5px;
`;

type Props = {
  isModalVisible: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  category: string;
  total: string;
  date: string;
  accountType: string;
  location: string;
};

export type TransactionInputArrData = {
  component: React.ReactNode;
  title: string;
};

//TODO Submit works, need to show a success message and close modal
//TODO show transactions on main feed
const ManualTransactionModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  const [createTransaction, { error, data: transactionResponse, loading }] =
    useMutation(CREATE_TRANSACTION);

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

  const submit = async () => {
    const { total } = data;
    try {
      const transactionRequest = await createTransaction({
        variables: { input: { ...data, total: parseFloat(total) } },
      });

      console.log('transaction req', transactionRequest);
    } catch (error) {
      console.error(error);
    }
  };

  //Refactor this to just be a JSON object and render inputs in the flatlist
  const DATA: Array<TransactionInputArrData> = [
    {
      title: 'Transaction',
      component: (
        <Input
          value={title}
          callback={(e: string) => handleTextChange('title', e)}
          style={null}
          labelStyle={{ color: Colors[colorScheme].text }}
          label={'What did you purchase?'}
          isSecure={false}
          descriptor="Transaction Name"
          icon={
            <FontAwesome
              name="shopping-bag"
              color={Colors[colorScheme].tint}
              size={20}
            />
          }
          color={Colors[colorScheme].tint}
        />
      ),
    },
    {
      title: 'Location',
      component: (
        <Input
          value={location}
          callback={(e: string) => handleTextChange('location', e)}
          style={null}
          label="Location"
          descriptor="Where was this?"
          isSecure={false}
          icon={
            <Ionicons
              name="location-sharp"
              color={Colors[colorScheme].tint}
              size={28}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Total',
      component: (
        <Input
          value={total}
          callback={(e: string) => handleTextChange('total', e)}
          style={null}
          label={'Total'}
          descriptor="What was the total?"
          isSecure={false}
          icon={
            <MaterialIcons
              name="attach-money"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Category',
      component: (
        <Input
          value={category}
          callback={(e: string) => handleTextChange('category', e)}
          style={null}
          label={'Category'}
          descriptor="ex: food, entertainment, groceries..."
          isSecure={false}
          icon={
            <Ionicons
              name="fast-food-sharp"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Account Type',
      component: (
        <Input
          value={accountType}
          callback={(e: string) => handleTextChange('accountType', e)}
          style={null}
          label="Account type"
          descriptor="Cash, credit, debit, etc..."
          isSecure={false}
          icon={
            <MaterialCommunityIcons
              name="credit-card-multiple"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Date',
      component: (
        <DateContainer>
          <IconContainer>
            <Ionicons
              name="md-calendar-sharp"
              color={Colors[colorScheme].tint}
              size={26}
            />
          </IconContainer>
          <Column>
            <DatePickerModal
              value={date}
              param="date"
              onChange={handleTextChange}
              placeholder={'Transaction date'}
              placeholderTextColor={Colors[colorScheme].text + '60'}
              style={{ marginLeft: 10, color: Colors[colorScheme].text }}
            />
          </Column>
        </DateContainer>
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
              <Row style={{ flexWrap: 'wrap', maxWidth: '80%' }}>
                <Text
                  style={{
                    color: Colors[colorScheme].text,
                    fontWeight: '100',
                    fontSize: 16,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  Manually enter new transaction
                </Text>
              </Row>
              <Row style={{ maxWidth: '20%' }}>
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
              </Row>
            </ModalHeader>
            <TransactionInputList inputList={DATA} />

            {!loading ? (
              <PrimaryButton
                buttonText={'Submit transaction'}
                buttonTextColor={Colors[colorScheme].text}
                callBack={submit}
                callBackArgs={currentStep + 1}
                colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
              />
            ) : (
              <LoadingSpinner />
            )}
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default ManualTransactionModal;
