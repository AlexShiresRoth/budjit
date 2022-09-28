import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { FETCH_ACCOUNT_PROFILE } from '../../../../graphql/queries/accounts.query';
import SmallAvatarRound from '../../../images/SmallAvatarRound';

type Props = {
  userId: string;
  textColor: string;
  fontSize: number;
};
const UserDisplay = ({ userId, textColor, fontSize }: Props) => {
  const { error, data, loading } = useQuery(FETCH_ACCOUNT_PROFILE, {
    variables: { input: { accountId: userId } },
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <SmallAvatarRound
        imgSrc={data?.fetchAccountProfile?.profile?.avatar}
        size={15}
      />
      <Text style={{ color: textColor, fontSize, marginLeft: 5 }}>
        {data?.fetchAccountProfile?.profile?.name}
      </Text>
    </View>
  );
};

export default UserDisplay;
