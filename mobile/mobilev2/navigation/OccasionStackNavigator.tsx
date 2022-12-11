import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OccasionScreen from '../screens/auth/account/occasions/OccasionScreen';
import { OccasionStackParamList } from '../types';

const OccasionStackNav = createNativeStackNavigator<OccasionStackParamList>();

export const OccasionStackNavigator = () => {
  return (
    <OccasionStackNav.Navigator>
      <OccasionStackNav.Screen
        name="OccasionScreen"
        component={OccasionScreen}
      />
    </OccasionStackNav.Navigator>
  );
};
