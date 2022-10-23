import React, {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Button, FlatList, Text, View } from 'react-native';
import EmptyState from '../reusable/EmptyState';
import styled from 'styled-components/native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import CreateOccasions from './CreateOccasions';
import { useQuery } from '@apollo/client';
import { LOAD_MY_OCCASIONS } from '../../graphql/queries/occasions.query';
import LoadingSpinner from '../reusable/LoadingSpinner';
import { OccasionType } from '../../types/Occasion.types';
import OccasionItem from './items/OccasionItem';

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const EmptyContainer = styled.View`
  width: 90%;
`;

type Props = {
  isVisible: boolean;
  handleModalVisibility: Dispatch<SetStateAction<boolean>>;
};

const MyOccasions = ({ isVisible, handleModalVisibility }: Props) => {
  const [occasions, setOccasions] = useState<Array<any>>([]);

  const colorScheme = useColorScheme();

  const { error, data, loading } = useQuery(LOAD_MY_OCCASIONS);

  const renderItem = ({ item }: { item: OccasionType }) => (
    <OccasionItem item={item} key={item?._id} />
  );

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
          <EmptyState title="No Occasions Yet" />
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
            onPress={() => handleModalVisibility(true)}
          />
        </EmptyContainer>
        <CreateOccasions
          isVisible={isVisible}
          handleModalVisibility={handleModalVisibility}
        />
      </Container>
    );
  }

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        renderItem={renderItem}
        data={occasions}
        style={{ width: '100%' }}
      />
      <CreateOccasions
        isVisible={isVisible}
        handleModalVisibility={handleModalVisibility}
      />
    </View>
  );
};

export default MyOccasions;
