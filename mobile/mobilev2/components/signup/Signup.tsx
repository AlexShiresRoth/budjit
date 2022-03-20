import React, { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import Input from '../reusable/Input';
import PrimaryButton from '../reusable/PrimaryButton';
import {
  MaterialCommunityIcons,
  FontAwesome5,
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

const Container = styled.View``;

const Heading = styled.Text`
  font-size: 40px;
  font-weight: 700;
  color: #fff;
`;
const Subheading = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #fefefe;
  opacity: 0.8;
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
  icon: React.ReactElement;
}

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
      <Heading>Get Started</Heading>
      <Subheading>Create an account to access features</Subheading>
      <Form colorScheme={colorScheme} dispatch={dispatch} />
    </Container>
  );
};

const Form = ({
  colorScheme,
  dispatch,
}: ColorScheme & { dispatch: Dispatch<AnyAction> }) => {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const { email, name, password, passwordConfirm } = inputs;

  const [submitAccount, { error, loading, data }] = useMutation(SIGN_UP);

  const DATA = [
    {
      label: 'Email',
      value: email,
      style: { borderColor: Colors[colorScheme].tint },
      key: 'email',
      isSecure: false,
      icon: (
        <MaterialCommunityIcons
          name="email-outline"
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
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </FormContainer>
  );
};

export default Signup;
