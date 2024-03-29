import React, { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import Input from '../inputs/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../graphql/mutations/accounts.mutations';
import { AccountTypes } from '../../types/RootState.types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  createAccount,
  selectAccount,
} from '../../redux/reducers/accounts.reducers';
import { AnyAction } from 'redux';
import Heading from '../text/Heading';
import SubHeading from '../text/SubHeading';

const Container = styled.View`
  flex: 1;
  margin-bottom: 80px;
`;

const FormContainer = styled.View`
  margin-top: 20px;
`;
const InputColumn = styled.View`
  margin: 10px 0;
`;

const Text = styled.Text`
  color: #ffffff44;
`;

type ColorScheme = { colorScheme: 'light' | 'dark' };

interface DataProp {
  label: string;
  value: string;
  style: { borderColor: string };
  key: string;
  isSecure: boolean;
  icon: any;
}

type FormParams = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
};

const Signup = ({
  colorScheme,
  navigation,
}: ColorScheme &
  AccountTypes &
  BottomTabScreenProps<RootStackParamList, 'Signup'>) => {
  //redux action dispatcher
  const dispatch = useAppDispatch();

  const accountState = useAppSelector(selectAccount);

  useEffect(() => {
    if (accountState.isAuthenticated) {
      navigation.navigate('AccountSpace');
    }
  }, [accountState.isAuthenticated]);

  return (
    <Container>
      <Heading headingText="Get Started" />
      <SubHeading subheadingText="Create an account to access features" />
      <Form colorScheme={colorScheme} dispatch={dispatch} />
    </Container>
  );
};

const Form = ({
  colorScheme,
  dispatch,
}: ColorScheme & { dispatch: Dispatch<AnyAction> }) => {
  //each input should be required?
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });

  const { email, name, password, passwordConfirm, phone } = inputs;
  //check if person has filled all required fields
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [submitAccount, { error, loading, data }] = useMutation(SIGN_UP);

  //TODO handle any missing fields
  const handleFormCheck = ({ ...formData }: FormParams) => {
    const formValues = Object.values(formData);
    //check every value has been filled
    const isFormComplete = formValues.every((value) => value.length > 0);
    setIsFormComplete(isFormComplete);
  };

  const DATA: Array<DataProp> = [
    {
      label: 'Email',
      value: email,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'email',
      isSecure: false,
      icon: (
        <FontAwesome5 name="at" size={25} color={Colors[colorScheme].tint} />
      ),
    },
    {
      label: 'Phone',
      value: phone,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'phone',
      isSecure: false,
      icon: (
        <MaterialCommunityIcons
          name="phone-outline"
          size={25}
          color={Colors[colorScheme].tint}
        />
      ),
    },

    {
      label: 'Name',
      value: name,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'name',
      isSecure: false,
      icon: (
        <FontAwesome5 name="user" size={25} color={Colors[colorScheme].tint} />
      ),
    },
    {
      label: 'Password',
      value: password,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'password',
      isSecure: true,
      icon: (
        <Ionicons
          name="md-lock-closed-outline"
          size={25}
          color={Colors[colorScheme].tint}
        />
      ),
    },
    {
      label: 'Confirm Password',
      value: passwordConfirm,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'passwordConfirm',
      isSecure: true,
      icon: (
        <Ionicons
          name="md-lock-closed-outline"
          size={25}
          color={Colors[colorScheme].tint}
        />
      ),
    },
  ];

  const handleTextChange = (arg: string, value: string) =>
    setInputs({ ...inputs, [arg]: value });

  //pass retrieve data to redux store
  useEffect(() => {
    if (data && !error) {
      //not sure if this is correct yet
      dispatch(
        createAccount({
          token: data.createAccount.token,
          myAccount: { ...data.createAccount.Account },
        }),
      );
    }
  }, [data, error]);

  useEffect(() => {
    handleFormCheck(inputs);
  }, [inputs]);

  return (
    <FormContainer>
      {DATA.map((item: DataProp, key: number) => {
        return (
          <InputColumn key={key}>
            <Input
              label={item.label}
              value={item.value}
              callback={(e) => handleTextChange(item.key, e)}
              style={item.style}
              isSecure={item.isSecure ? true : false}
              icon={item.icon}
              color={Colors[colorScheme].tint}
              descriptor={item.label}
              labelStyle={{
                color: Colors[colorScheme].text,
                fontWeight: '700',
              }}
            />
          </InputColumn>
        );
      })}
      {!loading ? (
        <PrimaryButton
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          buttonText="Submit"
          callBack={submitAccount}
          callBackArgs={{ variables: { createAccountInput: { ...inputs } } }}
          buttonTextColor={Colors[colorScheme].background}
          disabled={!isFormComplete}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </FormContainer>
  );
};

export default Signup;
