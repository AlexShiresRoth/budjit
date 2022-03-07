import { MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import { AnyAction } from 'redux';
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

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  align-items: center;
  justify-content: center;
  background: #fff;
  elevation: 3;
  border-radius: 10px;
  flex: 1;
`;

const ModalRow = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  padding: 35px 0;
`;
const ModalText = styled.Text`
  font-weight: 700;
  font-size: 20px;
`;

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
      <TimeModal
        setModalVisibility={setModalVisibility}
        setFilter={setFilter}
        data={spendingData}
        modalVisible={modalVisible}
        colorScheme={colorScheme}
        spendingFilter={spendingFilter}
      />
      <Row>
        <SubHeading>
          Spending This {spendingData[spendingFilter].type}
        </SubHeading>
        <DateToggler
          style={{
            backgroundColor: Colors[colorScheme].tint + '80',
            borderWidth: 3,
            borderColor: Colors[colorScheme].tint + '50',
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

const TimeModal = ({
  modalVisible,
  setModalVisibility,
  colorScheme,
  data,
  setFilter,
  spendingFilter,
}: {
  modalVisible: boolean;
  setModalVisibility: SetStateAction<any>;
  setFilter: SetStateAction<any>;
  data: SpendingProps;
  spendingFilter: number;
} & ColorScheme) => {
  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
      >
        <ModalView style={{ backgroundColor: Colors[colorScheme].background }}>
          <MaterialIcons
            name="date-range"
            size={35}
            color={Colors[colorScheme].text + 'cc'}
          />
          <ModalText
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '100',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Set Filter By...
          </ModalText>
          {data.map((timeFrame: SpendingProps[0], key: number) => {
            return (
              <ModalRow
                key={key}
                style={{ backgroundColor: Colors[colorScheme].tint + '44' }}
                onPress={() => setFilter(key)}
              >
                {spendingFilter === key ? (
                  <ModalText
                    style={{
                      color: Colors[colorScheme].text + '60',
                      fontWeight: '100',
                      fontSize: 16,
                    }}
                  >
                    Current
                  </ModalText>
                ) : null}
                <ModalText style={{ color: Colors[colorScheme].text }}>
                  {timeFrame.type}ly spending
                </ModalText>
              </ModalRow>
            );
          })}
          <Pressable
            onPress={() => setModalVisibility(false)}
            style={{
              backgroundColor: Colors[colorScheme].danger,
              padding: 10,
              borderRadius: 5,
              elevation: 3,
              marginTop: 20,
              width: 100,
              alignItems: 'center',
            }}
          >
            <ModalText style={{ color: Colors[colorScheme].text }}>
              Close
            </ModalText>
          </Pressable>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default Spending;
