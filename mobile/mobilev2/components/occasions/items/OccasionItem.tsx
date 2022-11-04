import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import format from 'date-fns/format';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionStackParamList, RootTabParamList } from '../../../types';
import { OccasionType } from '../../../types/Occasion.types';

type Props = {
  item: OccasionType;
};

type NavProps = NativeStackScreenProps<
  OccasionStackParamList,
  'OccasionScreenNavigator'
>;

const OccasionItem = ({ item, navigation, route }: Props & NavProps) => {
  const colorScheme = useColorScheme();

  const date = format(parseFloat(item?.occasionCreationDate), 'PP');

  const navToScreen = (occasionId: string) =>
    navigation.navigate('OccasionScreenNavigator', {
      screen: 'OccasionScreen',
      params: { occasionId },
    });
    // console.log("item", item)

  return (
    <View
      style={{
        width: '100%',
        marginVertical: 3,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          width: '95%',
          backgroundColor: Colors[colorScheme].background,
          padding: 15,
          borderRadius: 10,
        }}
        onPress={() => navToScreen(item?._id)}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text>{item.title}</Text>
          <Text>{date}</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text>Initial Budget: ${item?.initialBudget}</Text>
          <Text>{item?.budget}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OccasionItem;
