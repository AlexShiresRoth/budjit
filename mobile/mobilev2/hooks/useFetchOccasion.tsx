import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { LOAD_OCCASION } from '../graphql/queries/occasions.query';
import {
  selectOccasions,
  setCurrentOccasion,
} from '../redux/reducers/occasions.reducer';
import { useAppDispatch, useAppSelector } from './reduxHooks';

type Props = {
  occasionID: string;
};
const useFetchOccasion = ({ occasionID }: Props) => {
  const dispatch = useAppDispatch();

  const occasionState = useAppSelector(selectOccasions);

  const { error, data, loading, refetch } = useQuery(LOAD_OCCASION, {
    variables: { input: { occasionID } },
  });

  useEffect(() => {
    if (data?.loadMyOccasions?.success && !error) {
      const occasion = data?.loadOccasion?.Occasion;
      dispatch(
        setCurrentOccasion({
          occasion,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    refetch();
    console.log('occasion! refetch');
  }, [occasionState.occasionRefreshTriggers.length]);

  return {
    occasion: data?.loadOccasion?.Occasion,
    loading,
    error,
  };
};

export default useFetchOccasion;
