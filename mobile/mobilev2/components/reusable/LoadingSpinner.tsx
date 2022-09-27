import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

const LoadingSpinner = () => {
  const [spinAnim, setRotateAnimation] = useState(new Animated.Value(0));

  const colorScheme = useColorScheme();

  const interpSpin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.circle,
      }),
    ).start();
  }, [spinAnim]);

  return (
    <Animated.View
      style={{
        height: 25,
        width: 25,
        borderWidth: 2,
        backgroundColor: Colors[colorScheme].background,
        borderTopColor: Colors[colorScheme].background,
        borderLeftColor: Colors[colorScheme].background,
        borderRightColor: Colors[colorScheme].background,
        borderBottomColor: Colors[colorScheme].tint,
        borderRadius: 900,

        transform: [
          {
            rotate: interpSpin,
          },
        ],
      }}
    ></Animated.View>
  );
};

export default LoadingSpinner;
