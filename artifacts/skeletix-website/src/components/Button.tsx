import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type ButtonProps = {
  children: ReactNode;
  to?: string;
  secondary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Button({ children, to, secondary = false, disabled = false, ...props }: ButtonProps) {
  const className = `button${secondary ? ' secondary' : ''}`;
  if (to) {
    return <Link className={className} to={to}>{children}<ArrowRight size={15} aria-hidden="true" /></Link>;
  }
  return <button className={className} disabled={disabled} {...props}>{children}</button>;
}
