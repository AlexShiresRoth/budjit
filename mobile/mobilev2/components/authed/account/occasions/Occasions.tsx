import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import SearchOccasions from './SearchOccasions';

const Container = styled.View`
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;

const SearchHeader = styled.View`
  width: 100%;
  padding: 20px 0;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const Text = styled.Text``;

const Occasions = () => {
  const colorScheme = useColorScheme();

  const [searchVisible, toggleVisibility] = useState<boolean>(false);

  return (
    <Container
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <SearchHeader
        style={{
          width: '100%',
          backgroundColor: Colors[colorScheme].tint,
        }}
      >
        <Row>
          <TouchableOpacity
            style={{
              backgroundColor: Colors[colorScheme].text + '40',
              padding: 8,
              borderRadius: 900,
              borderWidth: 1,
              borderColor: Colors[colorScheme].background + '20',
            }}
            onPress={() => toggleVisibility(!searchVisible)}
          >
            <AntDesign
              name={searchVisible ? 'closecircleo' : 'search1'}
              size={16}
              color={Colors[colorScheme].background}
            />
          </TouchableOpacity>
          {!searchVisible ? (
            <Text
              style={{
                color: Colors[colorScheme].background,
                marginLeft: 10,
                fontWeight: '700',
              }}
            >
              Search Occasions
            </Text>
          ) : null}
          <SearchOccasions isVisible={searchVisible} />
        </Row>
      </SearchHeader>
    </Container>
  );
};

export default Occasions;
