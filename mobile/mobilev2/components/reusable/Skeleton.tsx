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
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      {Array.from({ length: verticalBars }).map((_, i) => (
        <Animated.View
          style={{
            opacity: fadeAnim,
            height: 140,
            width: '100%',
            backgroundColor: Colors[colorScheme].accountBg,
            borderRadius: 10,
            display: 'flex',
            padding: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
          key={i}
        ></Animated.View>
      ))}
    </View>
  );
};

export default Skeleton;
