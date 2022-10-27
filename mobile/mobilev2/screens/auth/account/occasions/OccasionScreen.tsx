import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { LOAD_OCCASION } from '../../../../graphql/queries/occasions.query';
import { OccasionStackParamList } from '../../../../types';

type NavProps = NativeStackScreenProps<
  OccasionStackParamList,
  'OccasionScreen'
>;

//@TODO: Configure this screen, data loading works!
const OccasionScreen = ({ navigation, route }: NavProps) => {
  console.log('route.params.occasionId', route);

  const { error, data, loading, refetch } = useQuery(LOAD_OCCASION, {
    variables: { input: { occasionID: route?.params?.occasionId } },
  });

  console.log('data?.occasion', data);
  if (loading)
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <Text>Occasion Screen</Text>
    </SafeAreaView>
  );
};

export default OccasionScreen;
