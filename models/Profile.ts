import { SocialAccount } from '@/models/SocialAccount';
import { SocialAccounts } from '@/models/SocialAccounts';

export interface Profile {
  created_at: string;
  username: string;
  social_accounts: Record<SocialAccounts, SocialAccount | null>;
}
