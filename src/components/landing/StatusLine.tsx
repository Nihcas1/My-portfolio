'use client';

import React from 'react';
import { AskLink } from '../common/AskLink';

export function StatusLine() {
  return (
    <div className="my-2 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
      {/* Availability Pill */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400 font-medium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        <span>Open to AI Engineering Opportunities</span>
      </div>

      {/* Quick AI Trigger */}
      <AskLink
        query="What are you currently working on at Searce and what are your favorite AI technologies?"
        variant="pill"
        className="text-[11px] py-1 px-3"
      >
        Ask Virtual Sachin
      </AskLink>
    </div>
  );
}

export default StatusLine;
