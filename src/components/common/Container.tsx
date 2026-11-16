import { cn } from '@/lib/utils';
import React from 'react';

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
