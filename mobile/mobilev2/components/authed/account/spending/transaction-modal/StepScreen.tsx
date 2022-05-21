import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import PrimaryButton from '../../../../reusable/PrimaryButton';
import DatePickerModal from '../../../../reusable/DatePickerModal';

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.View`
  width: 100%;
  align-items: flex-start;
`;

const Text = styled.Text``;

type ItemParams = {
  name: string;
  value: string | number;
  descriptor: string;
  icon: React.ReactElement;
  placeholder: string;
  inputType: 'text' | 'date';
  maxStepAmt: number;
};

const StepScreen = ({
  item,
  handleTextChange,
  setStep,
  currentStep,
}: {
  item: ItemParams;
  handleTextChange: (name: string, event: string) => void;
  setStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
}) => {
  const colorScheme = useColorScheme();

  const [valueEntered, toggleValue] = useState<boolean>(false);

  const handleValueChange = () =>
    item.value !== '' ? toggleValue(true) : toggleValue(false);

  useEffect(() => {
    handleValueChange();
  }, [item.value]);

  return (
    <Column
      style={{
        marginTop: 40,
        marginBottom: 15,
        height: '70%',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontSize: 40,
          backgroundColor: Colors[colorScheme].background,
        }}
      >
        Step {currentStep + 1}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme].text + '90',
          fontSize: 20,
          backgroundColor: Colors[colorScheme].background,
        }}
      >
        {item.placeholder}
      </Text>
      <Row
        style={{
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors[colorScheme].tint,
          borderRadius: 5,
          padding: 15,
        }}
      >
        {item.icon}
        {
          {
            text: (
              <TextInput
                value={item.value.toString()}
                onChangeText={(e) => handleTextChange(item.name, e)}
                placeholder={item.descriptor}
                placeholderTextColor={Colors[colorScheme].text + '60'}
                style={{ marginLeft: 10, color: Colors[colorScheme].text }}
              />
            ),
            date: (
              <DatePickerModal
                value={item.value.toString()}
                param={item.name}
                onChange={handleTextChange}
                placeholder={'Transaction date'}
                placeholderTextColor={Colors[colorScheme].text + '60'}
                style={{ marginLeft: 10, color: Colors[colorScheme].text }}
              />
            ),
          }[item.inputType]
        }
      </Row>
      {currentStep >= item.maxStepAmt ? (
        <PrimaryButton
          buttonText={'Submit transaction'}
          buttonTextColor={Colors[colorScheme].text}
          callBack={() => {}}
          callBackArgs={currentStep + 1}
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        />
      ) : valueEntered ? (
        <PrimaryButton
          buttonText={'Next'}
          buttonTextColor={Colors[colorScheme].text}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        />
      ) : (
        <PrimaryButton
          buttonText="Next"
          buttonTextColor={Colors[colorScheme].text + '80'}
          callBack={setStep}
          callBackArgs={currentStep + 1}
          colorArr={[
            Colors[colorScheme].tint + '40',
            Colors[colorScheme].tint + '40',
          ]}
        />
      )}
    </Column>
  );
};

export default StepScreen;
