import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinkExit, LinkSuccess, PlaidLink } from 'react-native-plaid-link-sdk';

const SlideView = styled.View``;

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
  const [connections, setConnections] = useState<Array<any>>([]);

  const colorScheme = useColorScheme();

  console.log('comnections', connections);
  if (connections.length === 0) {
    return (
      <ScrollContainer
        style={{ backgroundColor: Colors[colorScheme].cardBg + '90' }}
      >
        <NoConnectionsView horizontal={true}>
          <Card style={{ backgroundColor: Colors[colorScheme].cardBg }}>
            <Text
              style={{
                color: Colors[colorScheme].text,
                fontWeight: '700',
                fontSize: 20,
              }}
            >
              No Accounts Connected
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
            >
              <AntDesign
                name="pluscircle"
                color={Colors[colorScheme].text}
                size={40}
              />
              <PlaidLink
                onSuccess={(success: LinkSuccess) => {
                  console.log(success);
                }}
                onExit={(exit: LinkExit) => {
                  console.log(exit);
                }}
              >
                <Text
                  style={{
                    color: Colors[colorScheme].text,
                    fontWeight: '700',
                    fontSize: 20,
                  }}
                >
                  Connect
                </Text>
              </PlaidLink>
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
  }

  return (
    <SlideView>
      <Card>
        <Text>CONNECTIONS</Text>
      </Card>
    </SlideView>
  );
};

export default BankingConnects;
