import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import { SocialAccountType } from '@/models/SocialAccount';

type AllowedPlatform =
  | 'tiktok'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'facebook'
  | 'x'
  | 'threads';

function mapToAllowedPlatform(
  value: SocialAccountType,
): AllowedPlatform | null {
  switch (value) {
    case 'twitter':
      return 'x';
    case 'instagram':
    case 'facebook':
    case 'youtube':
    case 'tiktok':
    case 'linkedin':
      return value;
    default:
      return null;
  }
}

interface GenerateJwtParams {
  userId: string;
  platform?: SocialAccountType;
  redirectUrl?: string;
}

interface GenerateJwtResponse {
  access_url: string;
  success: boolean;
  duration?: string;
}

const fetchGenerateJwtUrl = async ({
  userId,
  platform,
  redirectUrl,
}: GenerateJwtParams) => {
  const platforms: AllowedPlatform[] = [];
  if (platform) {
    const mapped = mapToAllowedPlatform(platform);
    if (mapped) platforms.push(mapped);
  }

  const response = await Axios<GenerateJwtResponse>(`/api/upload-post/jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    data: {
      ...(platforms.length ? { platforms } : {}),
      ...(redirectUrl ? { redirect_url: redirectUrl } : {}),
    },
  });

  return response.data;
};

export const useGenerateJwtUrl = ({ userId }: { userId: string }) => {
  const mutation = useMutation({
    mutationKey: ['upload-post', 'jwt', userId],
    mutationFn: fetchGenerateJwtUrl,
  });

  const generateJwtUrl = useCallback(
    async ({
      platform,
      redirectUrl,
    }: {
      platform?: SocialAccountType;
      redirectUrl?: string;
    }) => {
      const data = await mutation.mutateAsync({
        userId,
        platform,
        redirectUrl,
      });
      return data;
    },
    [mutation, userId],
  );

  return { ...mutation, generateJwtUrl };
};
