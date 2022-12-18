import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  Text,
  View,
  ViewWithBG,
} from '../../Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

//@TODO summon modal on add new button
//@TODO navigate to transactions on view transactions button

type Props = {
  toggleModal: (val: boolean) => void;
  isModalVisible: boolean;
  navAction: (screen: 'OccasionTransactionsScreen') => void;
};
const OccasionActions = ({ toggleModal, isModalVisible, navAction }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <ViewWithBG style={styles.content}>
        <View
          style={[
            styles.row,
            {
              marginLeft: 10,
            },
          ]}
        >
          <Text style={styles.heading}>Transactions</Text>
        </View>
        <View style={styles.row}>
          <Button
            style={[styles.button]}
            onPress={() => navAction('OccasionTransactionsScreen')}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors[colorScheme].text,
              }}
            >
              View All
            </Text>
            <AntDesign name="arrowright" size={12} />
          </Button>
          <PrimaryButton
            style={styles.button}
            onPress={() => toggleModal(!isModalVisible)}
          >
            <AntDesign
              name="plus"
              size={12}
              color={Colors[colorScheme].background}
            />
            <Text style={styles.text}>Add New</Text>
          </PrimaryButton>
        </View>
      </ViewWithBG>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: { fontSize: 12, color: 'white' },
});

export default OccasionActions;
