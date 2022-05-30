import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  resetAlert,
  selectAlert,
  setAlert,
} from '../../redux/reducers/alerts.reducers';
import { AlertType } from '../../types/Alert.types';

const Container = styled.TouchableOpacity`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2%;
  width: 100%;
  elevation: 99;
  z-index: 99;
`;
const Content = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;
const CloseBtn = styled.TouchableOpacity`
  margin-right: 10px;
  elevation: 5;
`;

const Message = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const Alert = () => {
  ////////////////////////////////////////
  const colorScheme = useColorScheme();
  /////////////////////////
  ///select alert state
  const alertState = useAppSelector(selectAlert);

  const {
    alert: { type, message },
  } = alertState;

  const dispatch = useAppDispatch();

  const handleAlertVisibility = () => dispatch(resetAlert(null));

  return (
    <Container
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <Content
        style={{
          backgroundColor: Colors[colorScheme].alertBackground,
          elevation: 2,
          borderBottomWidth: 5,
          borderRadius: 2,
          borderColor:
            type === 'danger'
              ? Colors[colorScheme].danger
              : Colors[colorScheme].success,
        }}
      >
        <CloseBtn onPress={() => handleAlertVisibility()}>
          <AntDesign
            color={Colors[colorScheme].text}
            size={20}
            name="closecircleo"
          />
        </CloseBtn>
        <Message
          style={{
            fontSize: 14,
            fontWeight: '700',
            margin: 10,
          }}
        >
          {message}
        </Message>
      </Content>
    </Container>
  );
};

export default Alert;
