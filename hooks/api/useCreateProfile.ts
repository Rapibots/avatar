import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';
import { useCallback } from 'react';

interface CreateProfileResponse {
  id: string;
  name: string;
  email: string;
}

interface FetchCreateProfileParams {
  userId: string;
}

const fetchCreateProfile = async ({ userId }: FetchCreateProfileParams) => {
  const response = await Axios<CreateProfileResponse>(
    `/api/upload-post/profiles`,
    {
      method: 'POST',
      headers: {
        'x-user-id': userId,
      },
    },
  );

  return response.data;
};

export const useCreateProfile = ({ userId }: FetchCreateProfileParams) => {
  const mutation = useMutation({
    mutationKey: ['profile', userId],
    mutationFn: fetchCreateProfile,
  });

  const createProfile = useCallback(() => {
    mutation.mutate({ userId });
  }, [mutation, userId]);

  return { ...mutation, createProfile };
};
