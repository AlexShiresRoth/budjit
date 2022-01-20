import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
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

  const handleStackNavigate = (screen: keyof RootStackParamList): void =>
    navigation.navigate(screen);

  return (
    <Container>
      <Row style={{ backgroundColor: Colors[colorScheme].tint + '22' }}>
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
    </Container>
  );
};

Settings.propTypes = {};

export default Settings;
