import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import DatePicker from '@react-native-community/datetimepicker';
import { Animated, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { format } from 'date-fns';
import useColorScheme from '../../hooks/useColorScheme';

const Text = styled.Text``;

const DateContainer = styled.View`
  margin: 10px 0;
`;

type ComponentProps = {
  value: string;
  onChange: (value: string, name: string) => void;
  param: 'date' | 'occasionStartDate';
  label: string;
};

const DatePickerModal = ({
  value,
  onChange,
  param = 'date',
  label = 'Choose a date',
}: ComponentProps) => {
  const colorScheme = useColorScheme();

  const minDate = new Date('2000-01-01');

  const date = new Date(value);

  const [slideIn, setSlideIn] = useState(new Animated.Value(-400)); // Initial value for opacity: 0

  const [showDatePicker, toggleDatePicker] = useState<boolean>(false);

  const handleDateTimeSelection = async (event: any) => {
    try {
      //format to date string
      if (event.type === 'dismissed') {
        return toggleDatePicker(false);
      }
      if (event.type === 'set') {
        const receivedDate = new Date(event.nativeEvent.timestamp ?? value);
        // //pass the value back to the parent

        onChange(
          // Param is the  name of the value to change, basically the name of the input that assigns value to state
          // like name="date" or name="occasionStartDate"
          param,
          new Date(new Date(receivedDate).getTime()).toLocaleDateString(),
        );
        //close the modal
        toggleDatePicker(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('date?', value);

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
        width: '90%',
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
      <DateContainer
        style={{
          padding: 5,
          borderRadius: 5,

          width: '100%',
        }}
      >
        <TouchableOpacity
          onPress={() => toggleDatePicker(!showDatePicker)}
          style={{ width: '100%', display: 'flex' }}
        >
          <Text
            style={{
              fontSize: 12,
              opacity: 0.7,
            }}
          >
            {label}
          </Text>
          <Text style={{ color: Colors[colorScheme].text }}>
            {format(new Date(value).getTime(), 'PPPP')}
          </Text>
        </TouchableOpacity>
        {showDatePicker ? (
          <DatePicker
            style={{ width: '100%', flex: 1 }}
            minimumDate={minDate}
            value={date}
            mode={'date'}
            onChange={(event: any) => handleDateTimeSelection(event)}
            display="default"
          />
        ) : null}
      </DateContainer>
    </Animated.View>
  );
};

export default DatePickerModal;
