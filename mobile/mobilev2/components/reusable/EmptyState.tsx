import React from 'react';
import { Text, View } from 'react-native';
import EmptyStateSvg from '../svgs/EmptyStateSvg';

type Props = {
  title: string;
};

const EmptyState = ({ title }: Props) => {
  return (
    <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <EmptyStateSvg />
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
    </View>
  );
};

export default EmptyState;
