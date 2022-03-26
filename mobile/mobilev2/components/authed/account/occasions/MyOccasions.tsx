import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import EmptyState from '../../../reusable/EmptyState';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import CreateOccasions from './CreateOccasions';
import { useQuery } from '@apollo/client';
import { LOAD_MY_OCCASIONS } from '../../../../graphql/queries/occasions.query';
import LoadingSpinner from '../../../reusable/LoadingSpinner';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const EmptyContainer = styled.View`
  width: 90%;
`;

const MyOccasions = () => {
  const [occasions, setOccasions] = useState<Array<any>>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  const { error, data, loading } = useQuery(LOAD_MY_OCCASIONS);

  useEffect(() => {
    if (data) {
      setOccasions(data.loadMyOccasions.Occasions);
    }
  }, [data]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text
          style={{
            color: Colors[colorScheme].text,
            fontSize: 30,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {error.message}
        </Text>
      </Container>
    );
  }

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
            onPress={() => setModalVisible(true)}
          />
        </EmptyContainer>
        <CreateOccasions
          isVisible={modalVisible}
          handleModalVisibility={setModalVisible}
        />
      </Container>
    );
  }
  return (
    <View>
      <CreateOccasions
        isVisible={modalVisible}
        handleModalVisibility={setModalVisible}
      />
    </View>
  );
};

export default MyOccasions;
