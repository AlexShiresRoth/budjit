import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { connect, RootStateOrAny } from 'react-redux';
import { AccountTypes } from '../../../types/RootState.types';

const Container = styled.View`
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;
const Box = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 10px;
`;
const SubHeading = styled.Text`
  font-size: 16px;
  color: #fefefe;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: #fefefe;
  font-size: 30px;
  font-weight: 700;
`;
const SubText = styled.Text`
  color: #fefefe55;
  font-weight: 700;
  margin-top: 20px;
`;
const Total = styled.Text`
  color: #fefefe;
  font-weight: 700;
  font-size: 50px;
`;
const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const UserName = styled.Text`
  color: #fefefe;
  font-size: 20px;
  font-weight: 700;
`;

type ColorScheme = { color: 'light' | 'dark' };

const AccountSpace = ({ accounts }: AccountTypes) => {
  const colorScheme = useColorScheme();

  const OCCASION_TOTAL = 0;

  return (
    <Container>
      <AccountHeader accounts={accounts} color={colorScheme} />
      <SpendingComponent accounts={accounts} />
      <Content>
        <Box style={{ backgroundColor: Colors[colorScheme].secondary }}>
          <SubHeading style={{ color: Colors[colorScheme].tint }}>
            Create Budgets For Certain Occasions
          </SubHeading>
          <Text>View My Occasions</Text>
          <SubText>Occasions Created:</SubText>
          <Total>{OCCASION_TOTAL}</Total>
        </Box>
      </Content>
    </Container>
  );
};

const AccountHeader = ({ accounts, color }: AccountTypes & ColorScheme) => {
  const { myAccount } = accounts;

  return (
    <Header
      style={{ borderBottomWidth: 1.5, backgroundColor: Colors[color].tint }}
    >
      <Content>
        <UserName>Hello, {myAccount?.name || 'Unknown'}</UserName>
      </Content>
    </Header>
  );
};

const SpendingComponent = ({ accounts }: AccountTypes) => {
  return (
    <Content style={{ marginBottom: 30 }}>
      <SubHeading>Spending This Month</SubHeading>
      <Total>$0</Total>
    </Content>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, {})(AccountSpace);
