import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';

const InputContainer = styled.View``;

const Input = styled.TextInput``;

type Props = {
  isVisible: boolean;
};

const SearchOccasions = ({ isVisible }: Props) => {
  const colorScheme = useColorScheme();

  const [width, setWidth] = useState(new Animated.Value(0));

  const expand = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(width, {
      toValue: 70,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const dimiinish = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(width, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const widthInterp = width.interpolate({
    inputRange: [0, 70],
    outputRange: ['0%', '70%'],
  });

  const animStyles = {
    width: widthInterp,
    marginLeft: 10,
    opacity: isVisible ? 1 : 0,
  };

  useEffect(() => {
    if (isVisible) {
      expand();
    } else dimiinish();
  }, [isVisible]);

  return (
    <Animated.View style={animStyles}>
      <Input
        placeholder="Search Occasions"
        style={{
          borderWidth: 1.5,
          borderColor: 'transparent',
          borderBottomColor: Colors[colorScheme].background + '90',
          paddingLeft: 5,
          paddingRight: 5,
          color: Colors[colorScheme].background + '80',
          fontSize: 16,
          fontWeight: '700',
        }}
        placeholderTextColor={Colors[colorScheme].background + '80'}
      />
    </Animated.View>
  );
};

export default SearchOccasions;
