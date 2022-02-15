import styled from 'styled-components/native';
import { Text } from 'react-native';
import Colors from '../../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const InputContainer = styled.View``;

const Switch = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const IconContainer = styled.TouchableOpacity`
  border-radius: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

type InviteProps = {
  colorScheme: 'light' | 'dark';
  toggleSearch: (val: boolean) => void;
};

const ToggleSearchButton = ({ colorScheme, toggleSearch }: InviteProps) => {
  return (
    <InputContainer>
      <Switch
        style={{
          marginTop: 40,
          backgroundColor: Colors[colorScheme].tint + '90',
        }}
        onPress={() => toggleSearch(true)}
      >
        <IconContainer
          style={{
            backgroundColor: Colors[colorScheme].background,
            borderWidth: 1,
            borderColor: Colors[colorScheme].background,
          }}
        >
          <AntDesign
            name="search1"
            color={Colors[colorScheme].tint}
            size={14}
          />
        </IconContainer>
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          Search For An Existing Group
        </Text>
      </Switch>
    </InputContainer>
  );
};

export default ToggleSearchButton;
