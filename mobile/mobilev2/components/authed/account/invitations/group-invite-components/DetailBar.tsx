import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';

const Bar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
`;
const Column = styled.View`
  flex: 1;
  align-items: center;
`;
const Text = styled.Text`
  font-weight: 700;
  font-size: 12px;
`;

const DetailBar = () => {
  const colorScheme = useColorScheme();

  return (
    <Bar style={{ backgroundColor: Colors[colorScheme].tint + '30' }}>
      <Column
        style={{
          borderRightWidth: 1,
          borderRightColor: Colors[colorScheme].tint + '50',
        }}
      >
        <Text style={{ color: Colors[colorScheme].tint }}>User </Text>
      </Column>
      <Column
        style={{
          borderRightWidth: 1,
          borderRightColor: Colors[colorScheme].tint + '50',
        }}
      >
        <Text style={{ color: Colors[colorScheme].tint }}>Group</Text>
      </Column>
      <Column
        style={{
          borderRightWidth: 1,
          borderRightColor: Colors[colorScheme].tint + '50',
        }}
      >
        <Text style={{ color: Colors[colorScheme].tint }}>Status</Text>
      </Column>
      <Column>
        <Text style={{ color: Colors[colorScheme].tint }}>Actions</Text>
      </Column>
    </Bar>
  );
};

DetailBar.propTypes = {};

export default DetailBar;
