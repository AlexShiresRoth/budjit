import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import {
  FontAwesome5,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { signOutOfAccount } from '../../../../redux/reducers/accounts.reducers';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;
const Row = styled.View`
  width: 100%;
  padding: 20px;
`;
const Link = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const LinkText = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const handleStackNavigate = (screen: keyof RootStackParamList): void =>
    navigation.navigate(screen);

  const handleSignOut = () => dispatch(signOutOfAccount());

  return (
    <Container>
      <Row>
        <Link onPress={() => handleStackNavigate('Profile')}>
          <FontAwesome5
            name="user"
            size={20}
            style={{ color: Colors[colorScheme].text, marginRight: 10 }}
          />
          <LinkText style={{ color: Colors[colorScheme].text }}>
            Profile
          </LinkText>
        </Link>
      </Row>

      <Row
        style={{
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme].tint + '80',
        }}
      >
        <Link onPress={() => handleStackNavigate('BankConnections')}>
          <MaterialCommunityIcons
            name="bank-outline"
            size={20}
            style={{ color: Colors[colorScheme].text, marginRight: 10 }}
          />
          <LinkText style={{ color: Colors[colorScheme].text }}>
            Connect Bank Accounts & Cards
          </LinkText>
        </Link>
      </Row>
      <Row
        style={{
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme].tint + '80',
        }}
      >
        <Link>
          <Feather
            name="help-circle"
            size={20}
            style={{ color: Colors[colorScheme].text, marginRight: 10 }}
          />
          <LinkText style={{ color: Colors[colorScheme].text }}>
            Get Help
          </LinkText>
        </Link>
      </Row>
      <Row
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors[colorScheme].tint + '80',
        }}
      >
        <Link onPress={() => handleSignOut()}>
          <FontAwesome5
            name="sign-out-alt"
            size={20}
            style={{ color: Colors[colorScheme].text, marginRight: 10 }}
          />
          <LinkText style={{ color: Colors[colorScheme].text }}>
            Sign Out
          </LinkText>
        </Link>
      </Row>
    </Container>
  );
};

Settings.propTypes = {};

export default Settings;
