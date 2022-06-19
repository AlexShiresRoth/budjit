import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {
  verticalBars: number;
};

const Skeleton = ({ verticalBars }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial value for opacity: 0
  const colorScheme = useColorScheme();

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        minHeight: 200,
        width: '100%',
        backgroundColor: Colors[colorScheme].secondary,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          height: 200,
          width: '90%',
          backgroundColor: Colors[colorScheme].secondary,
          borderRadius: 5,
          display: 'flex',
          padding: 10,
        }}
      >
        {Array.from({ length: verticalBars }).map((_, i) => (
          <View
            style={{
              backgroundColor: Colors[colorScheme].tint + '70',
              width: '100%',
              height: 74 / verticalBars + '%',
              borderRadius: 5,
              marginTop: 6,
              marginBottom: 6,
            }}
            key={i}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default Skeleton;
