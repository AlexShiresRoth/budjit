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
        height: 30,
        width: 30,
        backgroundColor: 'transparent',
        borderWidth: 5,
        borderBottomColor: Colors[colorScheme].success,
        borderRadius: 900,
        marginTop: 20,
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
