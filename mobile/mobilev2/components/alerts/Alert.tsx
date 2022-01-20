import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
const Container = styled.View`
  margin-top: 40px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
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

function Alert({ message, status, callback }: AlertParams) {
  const colorScheme = useColorScheme();
  const ref: MutableRefObject<null | View> = useRef(null);

  return (
    <Container
      style={{
        backgroundColor:
          status === 'danger'
            ? Colors[colorScheme].danger + '64'
            : Colors[colorScheme].success + '44',
      }}
      ref={ref}
    >
      <Content>
        <CloseBtn onPress={callback}>
          <AntDesign color="#fefefe" size={24} name="closecircleo" />
        </CloseBtn>
        <Message>{message}</Message>
      </Content>
    </Container>
  );
}

export default Alert;
