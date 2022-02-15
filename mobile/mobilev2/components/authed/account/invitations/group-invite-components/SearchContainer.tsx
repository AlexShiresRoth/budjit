import styled from 'styled-components/native';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const InputContainer = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchContent = styled.View`
  width: 90%;
  margin-top: 50px;
`;

const SearchContainer = ({
  colorScheme,
}: {
  colorScheme: 'light' | 'dark';
}) => {
  return (
    <SearchContent>
      <InputContainer style={{ marginTop: 100, width: '100%' }}>
        <Row>
          <AntDesign
            name="search1"
            color={Colors[colorScheme].text}
            size={20}
          />
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 20,
              fontWeight: '700',
              marginLeft: 10,
            }}
          >
            Search My Groups
          </Text>
        </Row>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: Colors[colorScheme].tint,
            marginTop: 10,
            paddingTop: 5,
            paddingBottom: 5,
            color: Colors[colorScheme].text,
          }}
          placeholder="Start Typing..."
          placeholderTextColor={Colors[colorScheme].text + '80'}
          autoFocus={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors[colorScheme].success,
            marginTop: 20,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 5,
            alignSelf: 'flex-end',
          }}
        >
          <Text
            style={{ color: Colors[colorScheme].background, fontWeight: '700' }}
          >
            Select
          </Text>
        </TouchableOpacity>
      </InputContainer>
    </SearchContent>
  );
};

export default SearchContainer;
