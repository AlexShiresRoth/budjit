import React from 'react'
import { Text, View } from 'react-native'
import Colors from '../../../constants/Colors'
import useColorScheme from '../../../hooks/useColorScheme'
import { OccasionType } from '../../../types/Occasion.types'

type Props = {
    occasion: OccasionType
}

const OccasionBudgetUsed = ({occasion}: Props) => {
 
  const colorScheme = useColorScheme();

  return (
    <View>
      <Text style={{ fontSize: 12, color: Colors[colorScheme].text + '60' }}>
        Occasion Budget Used
      </Text>
      <Text style={{ fontSize: 26, fontWeight: '500' }}>
        ${occasion?.amountContributed}
      </Text>
    </View>
  );
}

export default OccasionBudgetUsed