import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import { FETCH_UPDATE } from '../../../../graphql/queries/updates.query';
import useColorScheme from '../../../../hooks/useColorScheme';
import DateFormatDisplay from '../../../reusable/DateFormatDisplay';
import Skeleton from '../../../reusable/Skeleton';
import UserDisplay from './UserDisplay';

const ActivityCard = ({ item }: any) => {
  const colorScheme = useColorScheme();

  const { error, data, loading } = useQuery(FETCH_UPDATE, {
    variables: { input: { updateId: item._id } },
  });

  console.log('data', data);

  if (loading) return <Skeleton verticalBars={1} />;

  if (error) return <Text>{error.message}</Text>;

  return (
    <View
      style={{
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: Colors[colorScheme].background,
        padding: 10,
      }}
    >
      <UserDisplay userId={data?.fetchUpdate?.update?.userRef} />
      <Text style={{ fontSize: 12, marginTop: 4, marginBottom: 4 }}>
        {data.fetchUpdate?.update?.updateDetails}
      </Text>
      <DateFormatDisplay
        dateString={data?.fetchUpdate?.update?.updateTime}
        dateTextColor={Colors[colorScheme].text + '55'}
        formatting={`p P`}
      />
    </View>
  );
};

export default ActivityCard;
