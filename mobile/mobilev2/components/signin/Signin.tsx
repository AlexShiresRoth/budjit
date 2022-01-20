import { useMutation } from '@apollo/client';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { SIGN_IN } from '../../graphql/mutations/accounts.mutations';
import useColorScheme from '../../hooks/useColorScheme';
import { action_authenticateUser } from '../../redux/actions/accounts.actions';
import { RootStackParamList } from '../../types';
import { ReduxThunkActionAuth } from '../../types/ReduxActions.types';
import { AccountTypes } from '../../types/RootState.types';
import Input from '../reusable/Input';
import PrimaryButton from '../reusable/PrimaryButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Alert from '../alerts/Alert';

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Heading = styled.Text`
  font-weight: 700;
  color: #fff;
  font-size: 40px;
`;
const Subheading = styled.Text`
  font-weight: 500;
  font-size: 20px;
  color: #fefefe;
  opacity: 0.8;
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
  accounts,
  action_authenticateUser,
  navigation,
}: ReduxThunkActionAuth &
  AccountTypes &
  BottomTabScreenProps<RootStackParamList, 'Signin'>) => {
  const { isAuthenticated } = accounts;
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Account');
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <Heading>Welcome Back</Heading>
      <Subheading>Sign in to access your account</Subheading>
      <Inputs action_authenticateUser={action_authenticateUser} />
    </Container>
  );
};

const Inputs = ({ action_authenticateUser }: ReduxThunkActionAuth) => {
  const colorScheme = useColorScheme();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const [alertError, setAlertError] = useState<Error | null>();

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

  const handleReduxAction = () =>
    action_authenticateUser({
      account: data.authenticate.Account,
      token: data.authenticate.token,
    });

  useEffect(() => {
    if (!error && data) {
      handleReduxAction();
    }
  }, [error, data]);

  useEffect(() => {
    if (error) {
      setAlertError(error);
    }
  }, [error]);

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
            />
          </Row>
        );
      })}
      {!loading ? (
        <PrimaryButton
          colorArr={[`#8980F5`, `#53D8FB`]}
          buttonText="Sign In"
          callBack={handleAuthentication}
          callBackArgs={undefined}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      {error && alertError && (
        <Alert
          message={error.message}
          status="danger"
          callback={() => setAlertError(null)}
        />
      )}
    </Form>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, { action_authenticateUser })(Signin);
