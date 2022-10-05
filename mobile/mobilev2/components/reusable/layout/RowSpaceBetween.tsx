import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const RowSpaceBetween = ({ children }: Props) => (
  <View
    style={{
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </View>
);

export default RowSpaceBetween;
