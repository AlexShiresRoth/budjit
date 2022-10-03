import React from 'react';
import { View } from 'react-native';

type Props = {
  amount: number;
};
const Spacer = ({ amount = 5 }: Props) => (
  <View style={{ marginTop: amount, marginBottom: amount }} />
);

export default Spacer;
