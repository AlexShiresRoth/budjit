import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import Input from '../../../reusable/Input';

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
const Column = styled.View``;

const Text = styled.Text``;

type Props = {
  isModalVisible: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  category: string;
  total: number;
  date: string;
  accountType: string;
  location: string;
};

//TODO finish input styling
const ManualTransactionModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  const [data, setData] = useState<FormData>({
    title: '',
    total: 0.0,
    date: '',
    accountType: '',
    category: '',
    location: '',
  });

  const { title, date, accountType, category, location, total } = data;

  const DATA: Array<{
    name: string;
    value: string | number;
    descriptor: string;
  }> = [
    {
      name: 'title',
      value: title,
      descriptor: 'What did you purchase?',
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
            <Row>
              <Text style={{ color: Colors[colorScheme].text }}>
                Manually enter a new transaction
              </Text>
              <Button title="close" onPress={() => toggleModal(false)}></Button>
            </Row>
            {DATA.map((inputObj, index: number) => {
              return (
                <Column key={index}>
                  <Input value={inputObj.value} label={inputObj.descriptor} />
                  <Row></Row>
                </Column>
              );
            })}
          </ModalInterior>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default ManualTransactionModal;
