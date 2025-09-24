'use client';

import { Button } from '@/components/Button';
import { useCreateProfile } from '@/hooks/api/useCreateProfile';
import { useGetProfile } from '@/hooks/api/useGetProfile';
import { SocialAccountType } from '@/models/SocialAccount';

const USER_ID = '123';

export default function Home() {
  const { profile, isLoading: isProfileLoading } = useGetProfile({
    userId: USER_ID,
  });

  const { createProfile } = useCreateProfile({
    userId: USER_ID,
  });

  const handleConnect = ({
    socialAccountType,
  }: {
    socialAccountType: SocialAccountType;
  }) => {
    if (!profile) return;

    // 1. call the create JWT URL endpoint
    // 2. redirect user to the JWT URL
  };

  if (isProfileLoading) {
    return <div className="bg-base p-8">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="bg-base p-8">
        <Button onClick={createProfile}>Create Profile</Button>
      </div>
    );
  }

  return (
    <div className="bg-base flex gap-4 p-8">
      <Button onClick={() => handleConnect({ socialAccountType: 'tiktok' })}>
        Tiktok
      </Button>
      <Button onClick={() => handleConnect({ socialAccountType: 'instagram' })}>
        Instagram
      </Button>
      <Button onClick={() => handleConnect({ socialAccountType: 'twitter' })}>
        Twitter
      </Button>
      <Button onClick={() => handleConnect({ socialAccountType: 'facebook' })}>
        Facebook
      </Button>
      <Button onClick={() => handleConnect({ socialAccountType: 'youtube' })}>
        YouTube
      </Button>
      <Button onClick={() => handleConnect({ socialAccountType: 'linkedin' })}>
        LinkedIn
      </Button>
    </div>
  );
}
