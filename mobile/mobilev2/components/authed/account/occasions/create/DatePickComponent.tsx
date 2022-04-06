import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import PrimaryButton from '../../../../reusable/PrimaryButton';
import DatePicker from '@react-native-community/datetimepicker';
import { Animated, TouchableOpacity } from 'react-native';

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

  const minDate = new Date();

  const date = new Date(value);

  const [slideIn, setSlideIn] = useState(new Animated.Value(-400)); // Initial value for opacity: 0

  const [showDatePicker, toggleDatePicker] = useState<boolean>(false);

  const handleDateTimeSelection = (date: any, text: string) => {
    //format to date string
    const receivedDate = new Date(
      date.nativeEvent.timestamp || value,
    ).toISOString();
    //pass the value back to the parent
    setValue(receivedDate, text);
    //close the modal
    toggleDatePicker(false);
  };

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
        <TouchableOpacity onPress={() => toggleDatePicker(!showDatePicker)}>
          <Text style={{ color: Colors[colorScheme].text }}>
            Choose Date: {value}
          </Text>
        </TouchableOpacity>
        {showDatePicker ? (
          <DatePicker
            style={{ width: '100%', flex: 1 }}
            value={date}
            minimumDate={minDate}
            onChange={(event: any) => {
              console.log('change event', event);
              if (event.type === 'dismissed') {
                toggleDatePicker(false);
              } else handleDateTimeSelection(event, 'occasionStartDate');
            }}
            onTouchCancel={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            // onCancel={() => console.log('CANCELLL')}
            display="calendar"
          />
        ) : null}
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
