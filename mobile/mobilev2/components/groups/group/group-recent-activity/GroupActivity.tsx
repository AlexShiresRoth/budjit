import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import ActivityCard from './ActivityCard';

type Props = {
  groupUpdates: Array<any>;
};

const GroupActivity = ({ groupUpdates }: Props) => {
  const colorScheme = useColorScheme();

  const [sortedUpdates, setSortedUpdates] = useState<any[]>([]);

  const renderItem = ({ item }: any) => {
    return <ActivityCard key={item._id} item={item} />;
  };

  const handleSortingUpdates = (updates: Array<any>) => {
    const sortedUpdates = updates.sort((a, b) =>
      a.updateTime - b.updateTime ? 1 : -1,
    );

    setSortedUpdates(sortedUpdates);
  };

  useEffect(() => {
    if (groupUpdates?.length > 0) {
      const cloneUpdates = [...groupUpdates];
      handleSortingUpdates(cloneUpdates);
    }
  }, [groupUpdates]);

  console.log('sorted updates', sortedUpdates);

  return (
    <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
      <View style={{ width: '90%' }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme].background,
            paddingBottom: 5,
            marginBottom: 10,
          }}
        >
          <Text>Recent Activity</Text>
        </View>
        {groupUpdates.length > 0 ? (
          <FlatList
            data={sortedUpdates.slice(0, 8)}
            renderItem={renderItem}
            horizontal={true}
          />
        ) : (
          <Text>No recent activity</Text>
        )}
      </View>
    </View>
  );
};

export default GroupActivity;
