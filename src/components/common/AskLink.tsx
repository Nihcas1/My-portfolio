'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';

interface AskLinkProps {
  text?: string;
  query?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'pill' | 'button' | 'link' | 'badge';
  autoSend?: boolean;
}

export function AskLink({
  text,
  query,
  children,
  className,
  variant = 'pill',
  autoSend = true,
}: AskLinkProps) {
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const prompt = query || text || (typeof children === 'string' ? children : '');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile()) {
      triggerHaptic('selection');
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { text: prompt, autoSend },
        }),
      );
    }
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98]',
          className,
        )}
      >
        <Sparkles className="size-3.5 text-cyan-500 animate-pulse" />
        <span>{children || 'Ask AI'}</span>
      </button>
    );
  }

  if (variant === 'link') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 underline underline-offset-4 cursor-pointer transition-colors',
          className,
        )}
      >
        <Sparkles className="size-3 text-cyan-500" />
        <span>{children || 'Ask about this →'}</span>
      </button>
    );
  }

  // Default 'pill' / 'badge'
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/60 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100 transition-all duration-200 cursor-pointer hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]',
        className,
      )}
    >
      <Sparkles className="size-3 text-cyan-500 group-hover:rotate-12 transition-transform duration-300" />
      <span>{children || 'Ask AI about this'}</span>
      <span className="text-cyan-500/70 group-hover:translate-x-0.5 transition-transform duration-200">
        →
      </span>
    </button>
  );
}

export default AskLink;

