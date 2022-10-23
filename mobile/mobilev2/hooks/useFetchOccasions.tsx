import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { LOAD_MY_OCCASIONS } from '../graphql/queries/occasions.query';
import {
  fetchOccasions,
  selectOccasions,
} from '../redux/reducers/occasions.reducer';
import { OccasionType } from '../types/Occasion.types';
import { useAppDispatch, useAppSelector } from './reduxHooks';

//handling updates to fetch state
const useFetchOccasions = () => {
  const dispatch = useAppDispatch();

  const occasionState = useAppSelector(selectOccasions);

  const { error, data, loading, refetch } = useQuery(LOAD_MY_OCCASIONS);

  useEffect(() => {
    if (data?.loadMyOccasions?.success && !error) {
      const occasions = data?.loadMyOccasions?.occasions;
      dispatch(
        fetchOccasions({
          occasions,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    refetch();
    console.log('occasions refetch');
  }, [occasionState?.occasions?.length]);

  return {
    occasions: data?.loadMyOccasions?.Occasions,
    loading,
    error,
  };
};

export default useFetchOccasions;
