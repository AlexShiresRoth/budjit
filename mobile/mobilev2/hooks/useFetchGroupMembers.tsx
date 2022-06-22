import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FETCH_GROUP_MEMBERS } from '../graphql/queries/group.query';

type Props = {
  groupID: string;
};

const useFetchGroupMembers = ({ groupID }: Props) => {
  const [members, setMembers] = useState<any[]>([]);

  const { error, data, loading } = useQuery(FETCH_GROUP_MEMBERS, {
    variables: { input: { groupID } },
  });

  useEffect(() => {
    if (!error && !loading) {
      setMembers(data?.fetchGroupMembers?.accounts);
    }
  }, [error, loading, data]);
  return { error, loading, members };
};

export default useFetchGroupMembers;
