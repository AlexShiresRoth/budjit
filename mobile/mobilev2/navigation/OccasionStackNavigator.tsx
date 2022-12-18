import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OccasionScreen from '../screens/auth/account/occasions/OccasionScreen';
import OccasionTransactionsScreen from '../screens/auth/account/occasions/OccasionTransactionsScreen';
import { OccasionStackParamList } from '../types';

const OccasionStackNav = createNativeStackNavigator<OccasionStackParamList>();

export const OccasionStackNavigator = () => {
  return (
    <OccasionStackNav.Navigator>
      <OccasionStackNav.Screen
        name="OccasionScreen"
        component={OccasionScreen}
        options={({ navigation }) => ({
          title: 'Occasion',
        })}
      />
      <OccasionStackNav.Screen
        name="OccasionTransactionsScreen"
        component={OccasionTransactionsScreen}
      />
    </OccasionStackNav.Navigator>
  );
};
