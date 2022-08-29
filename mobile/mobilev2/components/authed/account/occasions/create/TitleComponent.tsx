import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, Modal, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import PrimaryButton from '../../../../buttons/PrimaryButton';

const ModalComponent = styled.View``;

const Title = styled.Text`
  font-weight: 700;
`;

type ComponentProps = {
  value: string;
  setValue: any;
  setStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
};

const TitleComponent = ({
  value,
  setValue,
  setStep,
  currentStep,
}: ComponentProps) => {
  const colorScheme = useColorScheme();

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
              inputRange: [-300, -100, 0, 100, 101],
              outputRange: [300, 0, 1, 0, 0],
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
        Give this occasion a name
      </Title>

      <TextInput
        value={value}
        onChangeText={(e) => setValue(e, 'title')}
        style={{
          backgroundColor: Colors[colorScheme].cardBg,
          borderRadius: 5,
          padding: 10,
          fontSize: 16,
          marginTop: 10,
          marginBottom: 10,
          color: Colors[colorScheme].text,
        }}
        placeholder="Enter a title"
        placeholderTextColor={Colors[colorScheme].text + '80'}
      />

      {value !== '' ? (
        <PrimaryButton
          buttonText="Next"
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          buttonTextColor={Colors[colorScheme].text}
          disabled={false}
        />
      ) : (
        <PrimaryButton
          buttonText="Next"
          colorArr={['#66666660', '#66666660']}
          callBack={() => {}}
          callBackArgs={null}
          buttonTextColor={Colors[colorScheme].text + '40'}
          disabled={true}
        />
      )}
    </Animated.View>
  );
};

export default TitleComponent;
