import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';

const Container = styled.View`
  width: 100%;
  elevation: 0;
  background-color: #fff;
`;
const Interior = styled.View`
  width: 95%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
const Button = styled.TouchableOpacity`
  border-radius: 120px;
  padding: 15px;
`;
const Text = styled.Text``;

const ManualTransactionCard = ({
  colorScheme,
}: {
  colorScheme: 'light' | 'dark';
}) => {
  return (
    <Container
      style={{
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: 0,
      }}
    >
      <Interior>
        <Button
          style={{
            backgroundColor: Colors[colorScheme].tint,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: Colors[colorScheme].secondary,
            borderWidth: 4,
            borderStyle: 'solid',
          }}
        >
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 14,
            }}
          >
            New Transaction
          </Text>
        </Button>
      </Interior>
    </Container>
  );
};

export default ManualTransactionCard;
