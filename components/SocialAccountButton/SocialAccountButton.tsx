import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { Button, ButtonProps } from '@/components/common';
import { SocialAccounts } from '@/models/SocialAccounts';

interface ConnectProps {
  socialAccount: SocialAccounts;
}

interface SocialAccountButtonProps
  extends Omit<ButtonProps, 'children' | 'onClick'> {
  socialAccount: SocialAccounts;
  connect?: (props: ConnectProps) => void;
  isConnected?: boolean;
}

const socialAccountsIcons: Record<SocialAccounts, React.ReactNode> = {
  [SocialAccounts.INSTAGRAM]: <FaInstagram />,
  [SocialAccounts.X]: <FaTwitter />,
  [SocialAccounts.FACEBOOK]: <FaFacebook />,
  [SocialAccounts.YOUTUBE]: <FaYoutube />,
  [SocialAccounts.TIKTOK]: <FaTiktok />,
  [SocialAccounts.LINKEDIN]: <FaLinkedin />,
};

export const SocialAccountButton = ({
  socialAccount,
  connect,
  isConnected,
  disabled,
  ...props
}: SocialAccountButtonProps) => {
  const handleConnect = () => {
    if (typeof connect === 'function') {
      connect({ socialAccount });
    }
  };

  return (
    <Button
      {...props}
      onClick={handleConnect}
      disabled={isConnected || disabled}
    >
      <span className="flex items-center gap-2">
        {socialAccountsIcons[socialAccount]} {socialAccount}{' '}
        {isConnected ? '(connected)' : ''}
      </span>
    </Button>
  );
};
