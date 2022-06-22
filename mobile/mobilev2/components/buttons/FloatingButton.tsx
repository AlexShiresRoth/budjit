import React, { useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

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

type Props = {
  modalComponent: React.ReactElement;
  buttonText: string;
  modalToggle: (val: boolean) => void;
  modalVisible: boolean;
};

const FloatingButton = ({
  modalComponent,
  buttonText,
  modalToggle,
  modalVisible,
}: Props) => {
  const colorScheme = useColorScheme();

  return (
    <>
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
            onPress={() => modalToggle(!modalVisible)}
          >
            <Text
              style={{
                color: Colors[colorScheme].background,
                fontWeight: '700',
                fontSize: 14,
              }}
            >
              {buttonText}
            </Text>
          </Button>
        </Interior>
      </Container>
      {/* render component when toggle action occurs */}
      {modalVisible ? modalComponent : null}
    </>
  );
};

export default FloatingButton;
