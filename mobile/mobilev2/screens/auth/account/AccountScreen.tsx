import React from 'react';
import AccountSpace from '../../../components/authed/account/AccountSpace';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import AuthRoute from '../../../navigation/authed/AuthRoute';

const Container = styled.View`
  width: 100%;
`;

const AccountScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <AuthRoute>
      <Container
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme].background,
        }}
      >
        <AccountSpace />
      </Container>
    </AuthRoute>
  );
};

export default AccountScreen;
