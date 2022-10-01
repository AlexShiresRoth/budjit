import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Router } from 'express';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AllInvitesList from '../../../../components/groups/group/group-invites/AllInvitesList';
import { FETCH_GROUP_INVITES } from '../../../../graphql/queries/group.query';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { changeCurrentRoute } from '../../../../redux/reducers/navigation.reducers';
import { GroupStackParamList } from '../../../../types';

type Navigation = NativeStackScreenProps<
  GroupStackParamList,
  'GroupInvitesScreen'
>;

const GroupInvitesScreen = ({ route }: Navigation) => {
  const dispatch = useAppDispatch();

  const { data, loading, error, refetch } = useQuery(FETCH_GROUP_INVITES, {
    variables: { input: { groupID: route?.params?.groupId } },
  });

  const [combinedInvites, setCombinedInvites] = useState<any[]>([]);

  useEffect(() => {
    dispatch(changeCurrentRoute({ route: route.name }));
  }, []);

  useEffect(() => {
    if (!error) {
      //get combination of internal and external invites and provide their types
      setCombinedInvites(
        data?.loadGroup?.Group?.invites
          .map((invite: { _id: string }) => ({ type: 'internal', ...invite }))
          .concat(
            data?.loadGroup?.Group?.externalInvites?.map((invite: any) => ({
              type: 'external',
              ...invite,
            })),
          ),
      );
    }
  }, [data]);

  console.log('invites', combinedInvites);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <SafeAreaView>
      <AllInvitesList />
    </SafeAreaView>
  );
};

export default GroupInvitesScreen;
