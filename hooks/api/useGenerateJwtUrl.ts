import { useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import { SocialAccounts } from '@/models/SocialAccounts';

interface GenerateJwtParams {
  platform: SocialAccounts;
  redirectUrl?: string;
}

interface GenerateJwtResponse {
  access_url: string;
  success: boolean;
  duration?: string;
}

const fetchGenerateJwtUrl = async ({
  platform,
  redirectUrl,
}: GenerateJwtParams) => {
  const platforms = [platform];

  const response = await Axios<GenerateJwtResponse>(`/api/upload-post/jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...(platforms.length ? { platforms } : {}),
      ...(redirectUrl ? { redirect_url: redirectUrl } : {}),
    },
  });

  return response.data;
};

export const useGenerateJwtUrl = () => {
  const [socialAccount, setSocialAccount] = useState<SocialAccounts | null>(
    null,
  );

  const mutation = useMutation({
    mutationKey: ['upload-post', 'jwt'],
    mutationFn: fetchGenerateJwtUrl,
  });

  const generateJwtUrl = useCallback(
    async ({
      platform,
      redirectUrl,
    }: {
      platform: SocialAccounts;
      redirectUrl?: string;
    }) => {
      setSocialAccount(platform);
      const data = await mutation.mutateAsync({ platform, redirectUrl });
      return data;
    },
    [mutation, setSocialAccount],
  );

  return { ...mutation, generateJwtUrl, socialAccount };
};
