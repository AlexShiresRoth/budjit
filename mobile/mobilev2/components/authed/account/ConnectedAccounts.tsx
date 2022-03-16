import { useQuery } from '@apollo/client';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import {
  GET_PLAID_INSTITUTION,
  LOAD_PLAID_ACCOUNT_DATA,
} from '../../../graphql/queries/accounts.query';
import useColorScheme from '../../../hooks/useColorScheme';
import LoadingSpinner from '../../reusable/LoadingSpinner';

const Card = styled.View`
  width: 300px;
  height: 200px;
  margin: 0 20px
  border-radius: 5px;
  padding: 25px;
  elevation: 10;
  justify-content:space-around;
`;

const Text = styled.Text``;

const LogoContainer = styled.View`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const Logo = styled.Image`
  height: 40px;
  width: 40px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

type PlaidAccount = {
  _id: string;
  accessToken: string;
  accountName: string;
};

const ConnectedAccounts = ({
  connections,
}: {
  connections: PlaidAccount[];
}) => {
  const colorScheme = useColorScheme();

  console.log('connections!', connections);

  return (
    <>
      {connections.map((connection: PlaidAccount, index: number) => {
        return (
          <Connection
            index={index}
            connection={connection}
            colorScheme={colorScheme}
            key={index}
          />
        );
      })}
    </>
  );
};

const Connection = ({
  index,
  colorScheme,
  connection,
}: {
  index: number;
  colorScheme: 'light' | 'dark';
  connection: PlaidAccount;
}) => {
  const { data, loading, error } = useQuery(LOAD_PLAID_ACCOUNT_DATA, {
    variables: { input: { accessToken: connection.accessToken } },
  });

  //TODO get institution logos

  //TODO return a modal for account viewing
  //TODO need to get transactions based on time period
  if (loading) {
    return <LoadingSpinner />;
  }

  console.log('plaid data', data.loadPlaidData.item.institution_id);
  return (
    <Card key={index} style={{ backgroundColor: Colors[colorScheme].cardBg }}>
      <Text
        style={{
          color: Colors[colorScheme].text + '80',
        }}
      >
        Connection
      </Text>
      <Row>
        <InstitutionLogo
          institution_id={data.loadPlaidData.item.institution_id}
        />
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontSize: 30,
            fontWeight: '700',
          }}
        >
          {connection.accountName}
        </Text>
      </Row>
      <TouchableOpacity
        style={{
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          backgroundColor: Colors[colorScheme].success,
          borderRadius: 5,
          elevation: 3,
        }}
      >
        <Text style={{ color: Colors[colorScheme].text }}>View Accounts</Text>
      </TouchableOpacity>
    </Card>
  );
};

const InstitutionLogo = ({ institution_id }: { institution_id: string }) => {
  const { error, data, loading } = useQuery(GET_PLAID_INSTITUTION, {
    variables: { input: { institution_id, country_code: 'US' } },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  console.log('data loaded', data, loading, error);
  return (
    <LogoContainer>
      <Logo
        source={{
          uri: 'data:image/png;base64,' + data.getPlaidInstitution.logo,
        }}
      />
    </LogoContainer>
  );
};

export default ConnectedAccounts;
