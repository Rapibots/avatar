'use client';

import { Button } from '@/components/common';
import { SocialAccountButton } from '@/components/SocialAccountButton/SocialAccountButton';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from '@clerk/nextjs';
import { useCreateProfile } from '@/hooks/api/useCreateProfile';
import { useGenerateJwtUrl } from '@/hooks/api/useGenerateJwtUrl';
import { useGetProfile } from '@/hooks/api/useGetProfile';
import { SocialAccounts } from '@/models/SocialAccounts';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const { createProfile } = useCreateProfile();
  const { generateJwtUrl } = useGenerateJwtUrl();

  const handleConnect = async ({
    socialAccount,
  }: {
    socialAccount: SocialAccounts;
  }) => {
    if (!profile) return;

    const { access_url } = await generateJwtUrl({
      platform: socialAccount,
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

  if (!isSignedIn) {
    return (
      <div className="bg-base flex flex-col gap-3 p-8">
        <div className="flex items-center justify-end gap-3">
          <SignedOut>
            <SignInButton>
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
        <h1 className="text-xl font-semibold">Connect your social accounts</h1>
        <p className="text-sm opacity-80">Sign in to continue.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-base flex flex-col gap-3 p-8">
        <div className="flex items-center justify-end gap-3">
          <SignedOut>
            <SignInButton>
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <h1 className="text-xl font-semibold">Connect your social accounts</h1>
        <p className="text-sm opacity-80">
          First, create your profile to get started.
        </p>
        <Button onClick={createProfile}>Create Profile</Button>
      </div>
    );
  }

  return (
    <div className="bg-base flex flex-col items-center p-8">
      <div className="mb-2 flex w-full items-center justify-end gap-3">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Connect your social accounts</h1>
        <p className="text-sm opacity-80">
          Choose a platform to link via Upload-Post.
        </p>
      </div>
      <div className="flex max-w-48 flex-col items-stretch gap-3">
        {Object.values(SocialAccounts).map((socialAccount, index) => (
          <SocialAccountButton
            key={`${socialAccount}-${index}`}
            socialAccount={socialAccount}
            connect={handleConnect}
            isConnected={Boolean(profile.social_accounts?.[socialAccount])}
            size="sm"
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
