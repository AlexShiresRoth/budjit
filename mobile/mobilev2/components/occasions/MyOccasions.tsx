import React, { Dispatch, SetStateAction } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import EmptyState from '../reusable/EmptyState';
import styled from 'styled-components/native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import CreateOccasions from './CreateOccasions';
import LoadingSpinner from '../reusable/LoadingSpinner';
import { OccasionType } from '../../types/Occasion.types';
import OccasionItem from './items/OccasionItem';
import useFetchOccasions from '../../hooks/useFetchOccasions';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../types';

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

//@TODO: add a new tag to any occasion with the current date

type NavProps = BottomTabScreenProps<RootTabParamList, 'Occasions'>

const MyOccasions = ({ isVisible, handleModalVisibility, navigation, route }: Props & NavProps) => {
  const colorScheme = useColorScheme();

  const { occasions, error, loading } = useFetchOccasions();

  const renderItem = ({ item }: { item: OccasionType }) => (
    <OccasionItem item={item} key={item?._id} navigation={navigation} route={route}/>
  );

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
        style={{ width: '100%', marginBottom: 60, marginTop:10 }}
      />
      <CreateOccasions
        isVisible={isVisible}
        handleModalVisibility={handleModalVisibility}
      />
    </View>
  );
};

export default MyOccasions;
