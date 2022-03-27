import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import PrimaryButton from '../../../../reusable/PrimaryButton';
import DatePicker from 'react-native-datepicker';
import { Animated } from 'react-native';
const Text = styled.Text``;

const ModalComponent = styled.View``;

const Title = styled.Text`
  font-weight: 700;
`;
const DateContainer = styled.View`
  margin: 10px 0;
`;

type ComponentProps = {
  value: string;
  setValue: any;
  setStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
};

const DatePickComponent = ({
  value,
  setValue,
  setStep,
  currentStep,
}: ComponentProps) => {
  const colorScheme = useColorScheme();

  const minDate = new Date().toISOString().split('T')[0];

  const [slideIn, setSlideIn] = useState(new Animated.Value(-400)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(slideIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideIn]);

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
        Select the starting date for this occasion
      </Title>

      <DateContainer
        style={{
          backgroundColor: Colors[colorScheme].tint + '40',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <DatePicker
          style={{ width: '100%' }}
          date={value}
          mode="date"
          placeholder="select a starting date for this occasion"
          format="YYYY-MM-DD"
          minDate={minDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderRadius: 5,
              borderColor: 'transparent',
            },
            dateText: {
              color: Colors[colorScheme].text,
            },
          }}
          onDateChange={(date) => setValue(date, 'occasionStartDate')}
        />
      </DateContainer>

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

export default DatePickComponent;
