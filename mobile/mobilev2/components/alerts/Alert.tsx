import React, { MutableRefObject, useRef } from 'react';
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

const Container = styled.View`
  padding: 20px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  elevation: 3;
`;
const Content = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CloseBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Message = styled.Text`
  color: #fff;
  font-size: 16px;
`;

type AlertParams = {
  message: string;
  status: string;
  callback: (args: any) => any;
};

function Alert() {
  ////////////////////////////////////////
  const colorScheme = useColorScheme();
  /////////////////////////
  const ref: MutableRefObject<null | View> = useRef(null);
  ///select alert state
  const alertState = useAppSelector(selectAlert);

  const dispatch = useAppDispatch();

  const {
    alert: { type, message },
    isVisible,
  } = alertState;

  const handleAlertVisibility = () => {
    if (isVisible) {
      dispatch(resetAlert(null));
    }
  };

  return (
    <Container
      style={{
        backgroundColor:
          type === 'danger'
            ? Colors[colorScheme].danger + '84'
            : Colors[colorScheme].success,
        borderBottomWidth: 5,
        borderBottomColor: Colors[colorScheme].tint + '66',
      }}
      ref={ref}
    >
      <Content>
        <CloseBtn onPress={() => handleAlertVisibility()}>
          <AntDesign
            color={Colors[colorScheme].text}
            size={24}
            name="closecircleo"
          />
        </CloseBtn>
        <Message>{message}</Message>
      </Content>
    </Container>
  );
}

export default Alert;
