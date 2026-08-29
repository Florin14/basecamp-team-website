import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks';
import { cx } from '../../lib/format';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Direcția animației. */
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'rotate' | 'clip';
  delay?: number;
  /** Animează copiii pe rând, la interval fix (ms). */
  stagger?: number;
  /** Copiii „sar” în loc să alunece (folosit pentru pastile și insigne). */
  pop?: boolean;
  className?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
};

/** Container care se animează la intrarea în viewport. */
export function Reveal({
  children,
  as: Tag = 'div',
  variant = 'fade-up',
  delay,
  stagger,
  pop,
  className,
  id,
  role,
  'aria-label': ariaLabel,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ delay, stagger });

  return (
    <Tag
      ref={ref}
      id={id}
      role={role}
      aria-label={ariaLabel}
      data-reveal={stagger ? undefined : variant}
      className={cx(stagger ? (pop ? 'pop' : 'stagger') : 'reveal', className)}
    >
      {children}
    </Tag>
  );
}
