import { useQuery } from '@apollo/client';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { FETCH_ACCOUNT_PROFILE } from '../../../graphql/queries/accounts.query';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';

type Props = {
  occasion: OccasionType;
};

const OccasionCreator = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const { error, data, loading } = useQuery(FETCH_ACCOUNT_PROFILE, {
    variables: { input: { accountId: occasion?.creator } },
  });

  if (error) return null;

  if (loading) return null;

  return (
    <>
      <Text
        style={{
          borderRadius: 5,
          color: Colors[colorScheme].text ,
          fontSize: 10,
          padding: 5,
          
        }}
      >
        Occasion Creator
      </Text>
      <View style={{ flexDirection: 'row' , alignItems: "center", flexWrap:"wrap", marginVertical:2, position:"relative" , padding:5, borderRadius:5}}>
        <Image
          source={{ uri: data?.fetchAccountProfile?.profile?.avatar }}
          style={{ width: 25, height: 25, borderRadius: 9999,}}
        />
        <Text style={{marginLeft:7, fontSize:14, fontWeight:"400"}}>{data?.fetchAccountProfile?.profile?.name}</Text>
      </View>
    </>
  );
};

export default OccasionCreator;
