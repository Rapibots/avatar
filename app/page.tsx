'use client';

import { Button } from '@/components/Button';
import { useCreateProfile } from '@/hooks/api/useCreateProfile';
import { useGetProfile } from '@/hooks/api/useGetProfile';
import { useGenerateJwtUrl } from '@/hooks/api/useGenerateJwtUrl';
import { SocialAccountType } from '@/models/SocialAccount';

const USER_ID = '123';

export default function Home() {
  const { profile, isLoading: isProfileLoading } = useGetProfile({
    userId: USER_ID,
  });

  const { createProfile } = useCreateProfile({
    userId: USER_ID,
  });

  const { generateJwtUrl, isPending: isGenerating } = useGenerateJwtUrl({
    userId: USER_ID,
  });

  const handleConnect = async ({
    socialAccountType,
  }: {
    socialAccountType: SocialAccountType;
  }) => {
    if (!profile) return;

    const { access_url } = await generateJwtUrl({
      platform: socialAccountType,
      redirectUrl:
        typeof window !== 'undefined' ? window.location.origin : undefined,
    });

    if (access_url) {
      window.location.href = access_url;
    }
  };

  if (isProfileLoading) {
    return <div className="bg-base p-8">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="bg-base flex flex-col gap-3 p-8">
        <h1 className="text-xl font-semibold">Connect your social accounts</h1>
        <p className="text-sm opacity-80">
          First, create your profile to get started.
        </p>
        <Button onClick={createProfile}>Create Profile</Button>
      </div>
    );
  }

  return (
    <div className="bg-base p-8">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Connect your social accounts</h1>
        <p className="text-sm opacity-80">
          Choose a platform to link via Upload-Post.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'tiktok' })}
        >
          {isGenerating ? 'Opening…' : 'TikTok'}
        </Button>
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'instagram' })}
        >
          {isGenerating ? 'Opening…' : 'Instagram'}
        </Button>
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'twitter' })}
        >
          {isGenerating ? 'Opening…' : 'X (Twitter)'}
        </Button>
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'facebook' })}
        >
          {isGenerating ? 'Opening…' : 'Facebook'}
        </Button>
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'youtube' })}
        >
          {isGenerating ? 'Opening…' : 'YouTube'}
        </Button>
        <Button
          disabled={isGenerating}
          onClick={() => handleConnect({ socialAccountType: 'linkedin' })}
        >
          {isGenerating ? 'Opening…' : 'LinkedIn'}
        </Button>
      </div>
    </div>
  );
}
