import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
const Content = styled.View`
  width: 90%;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const SubHeading = styled.Text`
  font-size: 16px;
  color: #fefefe;
  font-weight: 700;
`;
const Total = styled.Text`
  color: #fefefe;
  font-weight: 700;
  font-size: 50px;
`;

const DateToggler = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 10px;
  font-weight: 700;
  margin-left: 5px;
`;

const ModalView = styled.View``;

const ModalText = styled.Text``;

type SpendingProps = Array<{ type: string; spending: number }>;

type ColorScheme = { colorScheme: 'light' | 'dark' };

const Spending = ({ colorScheme }: ColorScheme) => {
  const [spendingFilter, setFilter] = useState<number>(2);
  const [modalVisible, setModalVisibility] = useState<boolean>(false);
  const spendingData: SpendingProps = [
    { type: 'Year', spending: 0 },
    { type: 'Month', spending: 0 },
    { type: 'Week', spending: 0 },
  ];

  return (
    <Content style={{ marginBottom: 30 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
      >
        <ModalView>
          <ModalText>Hello I'm a modal</ModalText>
          <Pressable onPress={() => setModalVisibility(false)}>
            <ModalText>Close</ModalText>
          </Pressable>
        </ModalView>
      </Modal>
      <Row>
        <SubHeading>
          Spending This {spendingData[spendingFilter].type}
        </SubHeading>
        <DateToggler
          style={{
            backgroundColor: Colors[colorScheme].tint + '80',
            borderWidth: 2,
            borderColor: Colors[colorScheme].tint,
          }}
          onPress={() => setModalVisibility(true)}
        >
          <MaterialIcons
            name="date-range"
            size={12}
            color={Colors[colorScheme].text + 'cc'}
          />
          <DateText style={{ color: Colors[colorScheme].text + 'cc' }}>
            Change Timeframe
          </DateText>
        </DateToggler>
      </Row>
      <Total>${spendingData[spendingFilter].spending}</Total>
    </Content>
  );
};

Spending.propTypes = {};

export default Spending;
