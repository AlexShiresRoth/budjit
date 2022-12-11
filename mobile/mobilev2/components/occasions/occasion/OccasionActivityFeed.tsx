import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import ActivityCard from '../../activity-feed/ActivityCard';

type Props = {
  occasion: OccasionType;
};

const OccasionActivityFeed = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: { item: any }) => (
    <ActivityCard item={item} key={item?._id} />
  );
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginBottom: 5, fontWeight: '700' }}>
          Activity Feed
        </Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: Colors[colorScheme].tint + '60',
            marginLeft: 5,
          }}
        />
      </View>

      <FlatList
        data={occasion?.updates}
        horizontal={true}
        renderItem={renderItem}
      />
      <TouchableOpacity style={{marginTop:5}}>
        <Text>See All</Text>
      </TouchableOpacity>
    </>
  );
};

export default OccasionActivityFeed;
