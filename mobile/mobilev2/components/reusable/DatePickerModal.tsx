import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import DatePicker from '@react-native-community/datetimepicker';
import { Animated, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Text = styled.Text``;

const Title = styled.Text`
  font-weight: 700;
`;
const DateContainer = styled.View`
  margin: 10px 0;
`;

type ComponentProps = {
  value: string;
  onChange: (value: string, name: string) => void;
  placeholder: string;
  placeholderTextColor: string;
  style: any;
  param: string;
};

const DatePickerModal = ({
  value,
  onChange,
  placeholder,
  placeholderTextColor,
  style,
  param,
}: ComponentProps) => {
  const colorScheme = useColorScheme();

  const minDate = new Date();

  const date = new Date(value);

  const [slideIn, setSlideIn] = useState(new Animated.Value(-400)); // Initial value for opacity: 0

  const [showDatePicker, toggleDatePicker] = useState<boolean>(false);

  const handleDateTimeSelection = (date: any) => {
    //format to date string
    const receivedDate = new Date(
      date.nativeEvent.timestamp || value,
    ).toISOString();
    //pass the value back to the parent
    onChange(receivedDate, param);
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
          color: Colors[colorScheme].text + '90',
          fontWeight: '400',
          fontSize: 20,
          marginTop: 5,
          marginBottom: 15,
        }}
      >
        {placeholder}
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
            minimumDate={minDate}
            value={date}
            mode={'date'}
            onChange={(event: any) => handleDateTimeSelection(event)}
            onTouchCancel={(e) => {
              e.preventDefault();
              console.log(e);
            }}
            display="default"
          />
        ) : null}
      </DateContainer>
    </Animated.View>
  );
};

export default DatePickerModal;
