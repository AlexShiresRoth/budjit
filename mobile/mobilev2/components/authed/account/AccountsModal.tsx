import { useQuery } from '@apollo/client';
import React from 'react';
import { Button, FlatList, Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import { LOAD_PLAID_ACCOUNT_DATA } from '../../../graphql/queries/accounts.query';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import useColorScheme from '../../../hooks/useColorScheme';
import {
  selectAccount,
  togglePlaidAccountsModal,
} from '../../../redux/reducers/accounts.reducers';
import LoadingSpinner from '../../reusable/LoadingSpinner';

const Text = styled.Text``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Column = styled.View``;

const ModalView = styled.View`
  flex: 1;
  width: 100%;
  elevation: 10;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: #22222210;
`;
const ModalContent = styled.View`
  flex: 0.6;
  padding: 20px;
`;

const AccountsModal = () => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

  const {
    plaidAccounts: { modalVisible, connection },
  } = accountState;

  const dispatch = useAppDispatch();

  return modalVisible ? (
    <ModalView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() =>
          dispatch(
            togglePlaidAccountsModal({ connection: null, modalVisible: false }),
          )
        }
        style={{
          height: '50%',
        }}
      >
        <ModalContainer>
          <ModalContent
            style={{
              backgroundColor: '#0a363c',
              elevation: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <AccountData connection={connection} />
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  togglePlaidAccountsModal({
                    connection: null,
                    modalVisible: false,
                  }),
                )
              }
              style={{
                padding: 10,
                backgroundColor: Colors[colorScheme].danger,
                elevation: 11,
              }}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </ModalView>
  ) : null;
};

const Content = styled.View``;

const AccountData = ({
  connection,
}: {
  connection: { accessToken: string; accountName: string };
}) => {
  const colorScheme = useColorScheme();

  const { error, data, loading } = useQuery(LOAD_PLAID_ACCOUNT_DATA, {
    variables: { input: { accessToken: connection.accessToken } },
  });

  const renderItem = ({ item }: any) => {
    return <AccountItem item={item} />;
  };

  const Separator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: Colors[colorScheme].tint + '10',
          marginTop: 5,
          marginBottom: 5,
        }}
      ></View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Content>
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontSize: 40,
          fontWeight: '700',
        }}
      >
        {connection.accountName}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme].text + '80',
          fontSize: 20,
          fontWeight: '100',
          marginLeft: 5,
        }}
      >
        Balances
      </Text>
      <FlatList
        data={data.loadPlaidData.accounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <Separator />}
        style={{
          maxHeight: 200,
          marginTop: 10,
          marginBottom: 20,
          borderRadius: 10,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 50,
          backgroundColor: Colors[colorScheme].background + '20',
        }}
      />
    </Content>
  );
};

const AccountItem = ({ item }: any) => {
  const colorScheme = useColorScheme();
  console.log('im an item', item);
  return (
    <Column style={{ margin: 10 }}>
      <Row>
        <Text style={{ color: Colors[colorScheme].text, fontWeight: '700' }}>
          {item.name}
        </Text>
      </Row>
      <Column style={{ justifyContent: 'space-between' }}>
        <Text
          style={{
            color: Colors[colorScheme].success,
            fontWeight: '100',
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          Current Balance:{` `}
          {item.balances.current !== null
            ? '$' + item.balances.current.toFixed(2)
            : 'N/A'}
        </Text>
        <Text
          style={{
            color: '#0267C1',
            fontWeight: '100',
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          Available Balance: {` `}
          {item.balances.available !== null
            ? '$' + item.balances.available.toFixed(2)
            : 'N/A'}
        </Text>
      </Column>
    </Column>
  );
};

export default AccountsModal;
