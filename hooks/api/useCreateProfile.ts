import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';
import { useCallback } from 'react';

interface CreateProfileResponse {
  id: string;
  name: string;
  email: string;
}

const fetchCreateProfile = async () => {
  const response = await Axios<CreateProfileResponse>(
    `/api/upload-post/profiles`,
    {
      method: 'POST',
    },
  );

  return response.data;
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['profile'],
    mutationFn: fetchCreateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const createProfile = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return { ...mutation, createProfile };
};
