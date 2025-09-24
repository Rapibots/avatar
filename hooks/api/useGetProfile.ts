import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

import { Profile } from '@/models/Profile';

interface GetProfileResponse {
  profile: Profile;
}

interface FetchGetProfileParams {
  userId: string;
}

const fetchGetProfile = async ({ userId }: FetchGetProfileParams) => {
  const response = await Axios<GetProfileResponse>(
    `/api/upload-post/profiles`,
    {
      headers: {
        'x-user-id': userId,
      },
    },
  );

  return response.data;
};

export const useGetProfile = ({ userId }: FetchGetProfileParams) => {
  const query = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchGetProfile({ userId }),
    select: (data) => data.profile,
  });

  const profile = query.data;

  const getProfile = useCallback(() => {
    query.refetch();
  }, [query]);

  return { ...query, profile, getProfile };
};
