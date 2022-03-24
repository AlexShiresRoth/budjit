import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import EmptyState from '../../../reusable/EmptyState';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const EmptyContainer = styled.View`
  width: 90%;
`;

const MyOccasions = () => {
  const [occasions, setOccasions] = useState<Array<any>>([]);
  const colorScheme = useColorScheme();

  if (occasions.length === 0) {
    return (
      <Container>
        <EmptyContainer>
          <EmptyState />
          <Text
            style={{
              color: Colors[colorScheme].text,
              marginTop: -50,
              marginBottom: 30,
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            Nothing here yet!
          </Text>
          <Button
            title="Create New Occasion"
            color={Colors[colorScheme].tint}
            onPress={() => console.log('clickity')}
          />
        </EmptyContainer>
      </Container>
    );
  }
  return <View></View>;
};

export default MyOccasions;
