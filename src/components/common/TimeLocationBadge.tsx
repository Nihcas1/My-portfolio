'use client';

import { Clock, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function TimeLocationBadge() {
  const [timeString, setTimeString] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setTimeString(formatter.format(new Date()));
      } catch {
        setTimeString(
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xs font-mono">
      <span className="flex items-center gap-1 text-foreground/80">
        <MapPin className="size-3 text-cyan-500" />
        <span>Coimbatore, IN</span>
      </span>
      <span className="text-border">•</span>
      <span className="flex items-center gap-1">
        <Clock className="size-3 text-amber-500" />
        <span>{mounted && timeString ? `${timeString} IST` : 'IST (UTC+5:30)'}</span>
      </span>
    </div>
  );
}
