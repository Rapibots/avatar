import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

import { Profile } from '@/models/Profile';

interface GetProfileResponse {
  profile: Profile;
}

const fetchGetProfile = async () => {
  const response = await Axios<GetProfileResponse>(`/api/upload-post/profiles`);

  return response.data;
};

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchGetProfile(),
    select: (data) => data.profile,
  });

  const profile = query.data;

  const getProfile = useCallback(() => {
    query.refetch();
  }, [query]);

  return { ...query, profile, getProfile };
};
