import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { showHeader } from '../../../../redux/reducers/navigation.reducers';

const GroupOccasionsScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showHeader({ show: false }));
  }, []);
  
  return (
    <View>
      <Text>Group Occasions</Text>
    </View>
  );
};

export default GroupOccasionsScreen;
