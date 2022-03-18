import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useMutation, useQuery } from '@apollo/client';
import LoadingSpinner from '../../reusable/LoadingSpinner';
import {
  EXCHANGE_PLAID_PUBLIC_TOKEN,
  RETRIEVE_PLAID_TOKEN,
} from '../../../graphql/mutations/accounts.mutations';
import PlaidComponent from './PlaidComponent';
import ConnectedAccounts from './ConnectedAccounts';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectAccount } from '../../../redux/reducers/accounts.reducers';
import { LOAD_PLAID_ACCOUNTS } from '../../../graphql/queries/accounts.query';

const ScrollContainer = styled.View`
  flex: 1;
  min-height: 290px;
  margin-bottom: 30px;
  width: 100%;
  padding: 20px 0;
`;

const NoConnectionsView = styled.ScrollView`
  display: flex;
  flex-direction: row;
`;

const Card = styled.View`
  width: 300px;
  height: 200px;
  margin: 0 20px
  border-radius: 5px;
  padding: 15px;
  elevation: 10;
`;
const Text = styled.Text``;

const BankingConnects = () => {
  const colorScheme = useColorScheme();
  //connected bank accounts via plaid
  const [connections, setConnections] = useState<Array<any>>([]);
  //plaid auth token
  const [token, setToken] = useState<string>('');

  const [isPlaidVisible, togglePlaidComponent] = useState<boolean>(false);

  //need to send public token to server in order to store a permanent access token
  const [exchangePublicToken, { loading: tokenLoading }] = useMutation(
    EXCHANGE_PLAID_PUBLIC_TOKEN,
  );

  const [retrievePlaidToken, { error, data, loading }] =
    useMutation(RETRIEVE_PLAID_TOKEN);

  //grab plaid accounts from API
  const {
    error: loadAccountsError,
    data: plaidAccounts,
    loading: loadingAccounts,
    refetch,
  } = useQuery(LOAD_PLAID_ACCOUNTS);

  let webviewRef: any = useRef();

  //plaid webview events////////////////////////////
  const onExit = (event: any) => {
    togglePlaidComponent(false);
  };
  const onEvent = (event: any) => {};

  const onSuccess = async (event: any) => {
    try {
      togglePlaidComponent(false);

      await exchangePublicToken({
        variables: {
          input: {
            publicToken: event.publicToken,
            institutionName: event.metadata.institution.name,
          },
        },
      });

      //reload account on successful request
      refetch();
    } catch (error) {
      console.error('error', error);
      return error;
    }
  };
  ////////////////////////////////////////////////////////

  const handlePlaidConnect = async () => {
    try {
      togglePlaidComponent(true);

      const request = await retrievePlaidToken();

      if (request.data.retrievePlaidAuthToken.token) {
        setToken(request.data.retrievePlaidAuthToken.token);
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  //TODO need to set item ids from query
  useEffect(() => {
    if (!loadingAccounts) {
      setConnections(plaidAccounts.loadPlaidAccounts.accounts);
    }
  }, [loadingAccounts]);

  useEffect(() => {
    refetch();
  }, [tokenLoading]);

  //if for somereason plaid view is open, toggle it on reload
  useEffect(() => {
    togglePlaidComponent(false);
  }, []);

  if (loading) {
    return (
      <ScrollContainer>
        <Text>Loading...</Text>
        <LoadingSpinner />
      </ScrollContainer>
    );
  }

  if (isPlaidVisible) {
    return (
      <PlaidComponent
        token={token}
        webviewRef={webviewRef}
        onEvent={onEvent}
        onExit={onExit}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <ScrollContainer
      style={{ backgroundColor: Colors[colorScheme].cardBg + '90' }}
    >
      <NoConnectionsView horizontal={true}>
        {connections.length > 0 ? (
          <ConnectedAccounts connections={connections} />
        ) : null}
        <Card style={{ backgroundColor: Colors[colorScheme].cardBg }}>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 20,
            }}
          >
            Connect a new account
          </Text>

          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: Colors[colorScheme].background + '30',
              borderRadius: 5,
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: Colors[colorScheme].tint,
              borderWidth: 1.5,
            }}
            onPress={() => handlePlaidConnect()}
          >
            <AntDesign
              name="pluscircle"
              color={Colors[colorScheme].text}
              size={40}
            />

            <Text
              style={{
                color: Colors[colorScheme].text,
                fontWeight: '700',
                fontSize: 20,
              }}
            >
              Connect
            </Text>
          </TouchableOpacity>
        </Card>
        <Card style={{ backgroundColor: Colors[colorScheme].background }}>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 20,
            }}
          >
            Manually Enter Transactions
          </Text>
          <TouchableOpacity
            style={{
              padding: 20,
              backgroundColor: Colors[colorScheme].background + '30',
              borderRadius: 5,
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: Colors[colorScheme].text,
                fontWeight: '700',
                fontSize: 20,
              }}
            ></Text>
          </TouchableOpacity>
        </Card>
      </NoConnectionsView>
    </ScrollContainer>
  );
};

export default BankingConnects;
