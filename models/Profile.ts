import { SocialAccountType } from '@/models/SocialAccount';

export interface Profile {
  created_at: string;
  username: string;
  social_accounts: Record<SocialAccountType, string>;
}
