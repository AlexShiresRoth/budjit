import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import ActivityCard from '../../../activity-feed/ActivityCard';
import AllActivityModal from './AllActivityModal';

type Props = {
  groupUpdates: Array<any>;
};

const GroupActivity = ({ groupUpdates }: Props) => {
  const colorScheme = useColorScheme();

  const [sortedUpdates, setSortedUpdates] = useState<any[]>([]);

  const [isActivityModalVisible, setIsActivityModalVisible] = useState(false);

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

  return (
    <>
      <AllActivityModal
        isModalVisible={isActivityModalVisible}
        handleResetOnClose={() => setIsActivityModalVisible(false)}
        activityList={sortedUpdates}
      />
      <View style={{ marginTop: 20, alignItems: 'center', width: '100%' }}>
        <View style={{ width: '90%' }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme].background,
              paddingBottom: 5,
              marginBottom: 10,
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Recent Activity</Text>
              <TouchableOpacity onPress={() => setIsActivityModalVisible(true)}>
                <Text style={{ color: Colors[colorScheme].tint }}>See All</Text>
              </TouchableOpacity>
            </View>
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
    </>
  );
};

export default GroupActivity;
