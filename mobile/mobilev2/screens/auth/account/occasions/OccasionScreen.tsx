import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Occasion from '../../../../components/occasions/occasion/Occasion';
import { LOAD_OCCASION } from '../../../../graphql/queries/occasions.query';
import { OccasionStackParamList } from '../../../../types';

type NavProps = NativeStackScreenProps<
  OccasionStackParamList,
  'OccasionScreen'
>;

const OccasionScreen = ({ navigation, route }: NavProps) => {
  const { error, data, loading } = useQuery(LOAD_OCCASION, {
    variables: { input: { occasionID: route?.params?.occasionId } },
  });

  if (error) return null;

  if (loading)
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Occasion
        occasion={data?.loadOccasion?.Occasion}
        navigation={navigation}
        route={route}
      />
    </SafeAreaView>
  );
};

export default OccasionScreen;
