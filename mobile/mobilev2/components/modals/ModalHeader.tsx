import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import ModalCloseButton from '../buttons/ModalCloseButton';

const Container = styled.View`
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
  align-items: center;
`;

const ModalHeader = ({
  modalTitle,
  handleResetOnClose,
}: {
  modalTitle: string;
  handleResetOnClose: () => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <Container style={{ borderBottomColor: Colors[colorScheme].tint + '20' }}>
      <Row style={{ width: '100%', justifyContent: 'space-between' }}>
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontWeight: '100',
            fontSize: 16,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          {modalTitle}
        </Text>
        <Row>
          <ModalCloseButton
            handleResetOnClose={handleResetOnClose}
            buttonText="Close"
          />
        </Row>
      </Row>
    </Container>
  );
};

export default ModalHeader;
