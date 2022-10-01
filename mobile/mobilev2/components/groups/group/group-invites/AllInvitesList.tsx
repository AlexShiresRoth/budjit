import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { FETCH_GROUP_INVITES } from '../../../../graphql/queries/group.query';
import Skeleton from '../../../reusable/Skeleton';

type Props = {
  groupInvites: Array<any>;
};

const AllInvitesList = ({ groupInvites }: Props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AllInvitesList;
