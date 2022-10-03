import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { FETCH_EXTERNAL_INVITE } from '../../../../graphql/queries/invites.query';
import DateFormatDisplay from '../../../reusable/DateFormatDisplay';
import Skeleton from '../../../reusable/Skeleton';

type Props = {
  item: {
    _id: string;
    type: string;
  };
};

const ExternalInvite = ({ item }: Props) => {
  const { error, data, loading } = useQuery(FETCH_EXTERNAL_INVITE, {
    variables: { input: { _id: item._id } },
  });

  if (loading) return <Skeleton verticalBars={8} />;

  if (error) {
    return (
      <View>
        <Text>Could not retrieve invite</Text>
      </View>
    );
  }
  console.log('INVITE', data, item);
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View>
        <Text>{data?.fetchExternalInvite?.externalInvite?.receiverName}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Invited:</Text>
        <DateFormatDisplay
          dateString={data?.fetchExternalInvite?.externalInvite?.inviteDate}
          formatting="p P"
        />
      </View>
      <View>
        <Text>
          Invite status: {data?.fetchExternalInvite?.externalInvite?.status}
        </Text>
      </View>
    </View>
  );
};

export default ExternalInvite;
