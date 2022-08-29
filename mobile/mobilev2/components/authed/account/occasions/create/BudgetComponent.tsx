import { MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Input from '../../../../inputs/Input';
import PrimaryButton from '../../../../buttons/PrimaryButton';

const Text = styled.Text``;

const ModalComponent = styled.View``;

const Title = styled.Text`
  font-weight: 700;
`;

type ComponentProps = {
  value: string;
  setValue: any;
  setStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
};

const BudgetComponent = ({
  value,
  setValue,
  setStep,
  currentStep,
}: ComponentProps) => {
  const colorScheme = useColorScheme();

  const [slideIn, setSlideIn] = useState(new Animated.Value(-400)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(slideIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideIn]);

  //remove any non integer based value
  const handleValueCheck = (text: string) => {
    const regex = new RegExp(
      /[a-z]|[[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]]/,
      'gi',
    );

    const sanitized = text.replace(regex, '');

    setValue(sanitized, 'budget');
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: slideIn.interpolate({
              inputRange: [-300, -200, 0],
              outputRange: [-200, 0, 1],
            }),
          },
        ],
      }}
    >
      <Title
        style={{
          color: Colors[colorScheme].text,
          fontWeight: '700',
          fontSize: 40,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        Step {currentStep + 1}
      </Title>
      <Title
        style={{
          color: Colors[colorScheme].text + '90',
          fontWeight: '400',
          fontSize: 20,
          marginTop: 5,
          marginBottom: 15,
        }}
      >
        What's the budget for this occasion?
      </Title>

      <Input
        value={value}
        callback={(e) => handleValueCheck(e)}
        color={Colors[colorScheme].tint}
        style={{
          backgroundColor: Colors[colorScheme].tint,
          borderRadius: 5,
          padding: 10,
          fontSize: 16,
          marginTop: 10,
          marginBottom: 10,
          color: Colors[colorScheme].text,
        }}
        label="Enter a budget"
        isSecure={false}
        icon={
          <MaterialIcons
            name="attach-money"
            color={Colors[colorScheme].text}
            size={20}
          />
        }
      />

      {value !== '' ? (
        <PrimaryButton
          buttonText="Next"
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          buttonTextColor={Colors[colorScheme].text}
        />
      ) : (
        <PrimaryButton
          buttonText="Next"
          colorArr={['#66666660', '#66666660']}
          callBack={() => {}}
          callBackArgs={null}
          buttonTextColor={Colors[colorScheme].text + '40'}
        />
      )}
    </Animated.View>
  );
};

export default BudgetComponent;
