import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import {
  GET_PLAID_INSTITUTION,
  LOAD_PLAID_ACCOUNT_DATA,
} from '../../../graphql/queries/accounts.query';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import useColorScheme from '../../../hooks/useColorScheme';
import { togglePlaidAccountsModal } from '../../../redux/reducers/accounts.reducers';
import LoadingSpinner from '../../reusable/LoadingSpinner';
import AccountsModal from './AccountsModal';

const Card = styled.View`
  width: 300px;
  height: 200px;
  margin: 0 20px
  border-radius: 5px;
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

  const dispatch = useAppDispatch();

  const bgColors = [
    '#008DD5',
    '#E43F6F',
    '#A31621',
    '#FE7F2D',
    '#00B295',
    '#AB2346',
    '#CC7178',
    '#348AA7',
    '#DF367C',
    '#EF8354',
    '#CE5374',
    '#9B287B',
    '#8884FF',
    '#F26419',
    '#0267C1',
  ];

  const [bgColorArr, setBgColors] = useState<Array<string>>([
    '#FE7F2D',
    '#00B295',
  ]);

  const chooseColorPair = () => {
    const firstColor = Math.floor(Math.random() * bgColors.length - 1);
    const secondColor =
      Math.floor(Math.random() * bgColors.length - 1) === firstColor
        ? firstColor + 1 > bgColors.length
          ? 0
          : bgColors.length
        : Math.floor(Math.random() * bgColors.length - 1);

    setBgColors([bgColors[firstColor], bgColors[secondColor]]);
  };

  //set bg colors on load
  useEffect(() => {
    chooseColorPair();
  }, []);

  //TODO need to get transactions based on time period
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card key={index} style={{ backgroundColor: Colors[colorScheme].cardBg }}>
      <LinearGradient
        colors={[...bgColorArr]}
        style={{
          width: '100%',
          height: '100%',
          padding: 20,
          justifyContent: 'space-around',
          borderRadius: 5,
        }}
      >
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
            borderRadius: 5,
            flexDirection: 'row',
          }}
          onPress={() =>
            dispatch(
              togglePlaidAccountsModal({ connection, modalVisible: true }),
            )
          }
        >
          <Text style={{ color: Colors[colorScheme].text }}>View Accounts</Text>
          <AntDesign
            name="arrowright"
            size={20}
            color={Colors[colorScheme].text}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </LinearGradient>
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

  if (error) {
    return <Text>{error.message}</Text>;
  }

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
