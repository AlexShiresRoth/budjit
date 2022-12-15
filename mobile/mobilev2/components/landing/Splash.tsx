import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

const Splash = () => {
  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to Happ</Text>
        <Text style={styles.subheading}>Clearing up, who owes what</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '90%',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'pt-sans-bold',
  },
  subheading: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'pt-sans',
  },
});

export default Splash;
