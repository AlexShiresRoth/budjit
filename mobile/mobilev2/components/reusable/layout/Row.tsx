import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Row = ({ children }: Props) => (
  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
    {children}
  </View>
);

export default Row;
