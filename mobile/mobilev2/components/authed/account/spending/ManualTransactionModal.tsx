import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import Input from '../../../reusable/Input';
import {
  Feather,
  EvilIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
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

//TODO finish input styling
const ManualTransactionModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

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

  const DATA: Array<{
    name: string;
    value: string | number;
    descriptor: string;
    icon: React.ReactElement;
    placeholder: string;
  }> = [
    {
      name: 'title',
      value: title,
      descriptor: 'What did you purchase?',
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
        onRequestClose={() => toggleModal(false)}
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
              <Button title="close" onPress={() => toggleModal(false)}></Button>
            </Row>
            {DATA.map((inputObj, index: number) => {
              return (
                <Column
                  key={index}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: Colors[colorScheme].cardBg,
                    borderRadius: 5,
                  }}
                >
                  <Input
                    value={inputObj.value.toString()}
                    label={inputObj.descriptor}
                    callback={(e) => handleTextChange(inputObj.name, e)}
                    isSecure={false}
                    color={'#fff'}
                    icon={inputObj.icon}
                    style={null}
                    labelStyle={{
                      color: Colors[colorScheme].text,
                      fontWeight: '700',
                    }}
                  />
                </Column>
              );
            })}
            <Button title="Submit" onPress={() => {}}></Button>
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default ManualTransactionModal;
