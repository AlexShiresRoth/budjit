import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  item: {
    _id: string;
    type: string;
  };
};

const InternalInviteCard = ({ item }: Props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default InternalInviteCard;
