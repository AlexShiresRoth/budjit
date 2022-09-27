import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { FETCH_ACCOUNT_PROFILE } from '../../../../graphql/queries/accounts.query';

type Props = {
  userId: string;
};
const UserDisplay = ({ userId }: Props) => {
  const { error, data, loading } = useQuery(FETCH_ACCOUNT_PROFILE, {
    variables: { input: { accountId: userId } },
  });

  console.log('data', data);
  return (
    <View>
      <Text>{data?.fetchAccountProfile?.profile?.name}</Text>
    </View>
  );
};

export default UserDisplay;
