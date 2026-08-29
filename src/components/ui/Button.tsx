import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic, useRipple } from '../../hooks';
import { cx } from '../../lib/format';

type Variant = 'primary' | 'ghost' | 'light' | 'outline-light';

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  /** Rută internă (react-router). */
  to?: string;
  /** Link extern sau ancoră. */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  block?: boolean;
  /** Efect magnetic la hover, pe pointer fin. */
  magnetic?: boolean;
  glow?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  block,
  magnetic,
  glow,
  className,
  ariaLabel,
}: Props) {
  const ref = useMagnetic<HTMLElement>(Boolean(magnetic));
  const ripple = useRipple();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    ripple(event);
    onClick?.();
  };
  const cls = cx(
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    block && 'btn--block',
    glow && 'btn--glow',
    className,
  );
  const shared = { className: cls, 'aria-label': ariaLabel, onClick: handleClick };

  if (to) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} {...shared}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        {...shared}
      >
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} {...shared}>
      {children}
    </button>
  );
}
