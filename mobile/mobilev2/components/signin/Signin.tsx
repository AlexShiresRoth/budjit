import { useMutation } from '@apollo/client';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { SIGN_IN } from '../../graphql/mutations/accounts.mutations';
import useColorScheme from '../../hooks/useColorScheme';
import { RootStackParamList } from '../../types';
import Input from '../reusable/Input';
import PrimaryButton from '../reusable/PrimaryButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { AnyAction, Dispatch } from 'redux';
import {
  authenticate,
  selectAccount,
} from '../../redux/reducers/accounts.reducers';
import { setAlert } from '../../redux/reducers/alerts.reducers';
import Heading from '../text/Heading';
import SubHeading from '../text/SubHeading';

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Text = styled.Text`
  color: #fff;
`;

const Form = styled.View`
  margin-top: 50px;
`;

const Row = styled.View`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

interface DataProp {
  label: string;
  value: string;
  style: { borderColor: string };
  key: string;
  isSecure: boolean;
  icon: React.ReactElement;
}

const Signin = ({
  navigation,
}: BottomTabScreenProps<RootStackParamList, 'Signin'>) => {
  //action handler
  const dispatch = useAppDispatch();

  const accountState = useAppSelector(selectAccount);

  useEffect(() => {
    if (accountState.isAuthenticated) {
      navigation.navigate('AccountSpace');
    }
  }, [accountState.isAuthenticated]);

  return (
    <Container>
      <Heading headingText="Welcome Back" />
      <SubHeading subheadingText=" Sign in to access your account" />
      <Inputs dispatch={dispatch} />
    </Container>
  );
};

const Inputs = ({ dispatch }: { dispatch: Dispatch<AnyAction> }) => {
  const colorScheme = useColorScheme();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const DATA = [
    {
      value: email,
      label: 'Email',
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
      value: password,
      label: 'Password',
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
  ];
  const handleTextChange = (text: string, arg: string) =>
    setInputs({ ...inputs, [arg]: text });

  const [authenticateUser, { error, data, loading }] = useMutation(SIGN_IN);

  const handleAuthentication = async () => {
    const DATA = { email, password };

    try {
      await authenticateUser({ variables: { loginInput: DATA } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReduxAction = () => {
    dispatch(
      authenticate({
        myAccount: {
          email: data.authenticate.Account.email,
          name: data.authenticate.Account.name,
          profile: data.authenticate.Account.profile,
        },
        token: data.authenticate.token,
      }),
    );
  };

  useEffect(() => {
    if (error) {
      dispatch(
        setAlert({
          type: 'danger',
          message: error.message,
        }),
      );
    }
  }, [error]);

  useEffect(() => {
    if (!error && data) {
      handleReduxAction();
    }
  }, [error, data]);

  return (
    <Form>
      {DATA.map((item: DataProp, key: number) => {
        return (
          <Row key={key}>
            <Input
              label={item.label}
              style={item.style}
              isSecure={item.isSecure ? true : false}
              callback={(e) => handleTextChange(e, item.key)}
              value={item.value}
              icon={item.icon}
              color={Colors[colorScheme].tint}
              labelStyle={{ fontWeight: '700' }}
              descriptor={`${item.label}`}
            />
          </Row>
        );
      })}
      {!loading ? (
        <PrimaryButton
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          buttonText="Sign In"
          callBack={handleAuthentication}
          callBackArgs={undefined}
          buttonTextColor={Colors[colorScheme].background}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </Form>
  );
};

export default Signin;
