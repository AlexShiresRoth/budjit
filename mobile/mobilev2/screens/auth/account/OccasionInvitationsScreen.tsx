import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Invitations from '../../../components/authed/account/invitations/Invitations';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { RootStackParamList } from '../../../types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OccasionInvitationsScreen'
>;

const OccasionInvitationsScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeInterp = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    navigation.setParams({ name: 'occasion' });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          backgroundColor: Colors[colorScheme].background,
          opacity: fadeInterp,
          flex: 1,
        }}
      >
        <Invitations route={route} navigation={navigation} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default OccasionInvitationsScreen;
