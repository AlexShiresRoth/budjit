import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FETCH_MY_GROUPS } from '../graphql/queries/groups.query';
import { fetchMyGroups, selectGroups } from '../redux/reducers/groups.reducers';
import { useAppDispatch, useAppSelector } from './reduxHooks';

const useFetchGroups = () => {
  const { groups } = useAppSelector(selectGroups);

  const dispatch = useAppDispatch();

  const { error, data, loading } = useQuery(FETCH_MY_GROUPS);

  useEffect(() => {
    if (data?.fetchGroups?.success) {
      dispatch(fetchMyGroups(data?.fetchGroups?.groups));
    }
  }, [data]);

  return { groups, loading, error };
};

export default useFetchGroups;
