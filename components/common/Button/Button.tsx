import { twMerge } from 'tailwind-merge';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm px-2 py-1 rounded-sm',
  md: 'text-md px-4 py-2 rounded-md',
  lg: 'text-lg px-6 py-3 rounded-lg',
};

export const Button = ({
  className,
  size = 'md',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'cursor-pointer',
        'bg-black font-semibold text-white',
        'w-fit',
        'rounded-md',
        'transition-all duration-300',
        'hover:bg-neutral-700',
        'disabled:bg-neutral-300',
        'disabled:cursor-auto',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
