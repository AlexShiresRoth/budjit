import { useQuery } from '@apollo/client';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { FETCH_ACCOUNT_PROFILE } from '../../../graphql/queries/accounts.query';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';

type Props = {
  occasion: OccasionType;
};

const OccasionCreator = ({ occasion }: Props) => {
  const { error, data, loading } = useQuery(FETCH_ACCOUNT_PROFILE, {
    variables: { input: { accountId: occasion?.creator } },
  });

  if (error) return null;

  if (loading) return null;

  return (
    <>
      <Text style={styles.heading}>Occasion Creator</Text>
      <View style={styles.info}>
        <Image
          source={{ uri: data?.fetchAccountProfile?.profile?.avatar }}
          style={styles.image}
        />
        <Text style={{ marginLeft: 7, fontSize: 14, fontWeight: '400' }}>
          {data?.fetchAccountProfile?.profile?.name}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
    fontWeight: 'bold',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 2,
    position: 'relative',
    padding: 5,
    borderRadius: 5,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 999,
  },
});

export default OccasionCreator;
