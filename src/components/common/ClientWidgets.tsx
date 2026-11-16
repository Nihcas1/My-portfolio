'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Lazy-load heavy client-only interactive widgets so pages compile ultra fast
const NeuralCoreHologram = dynamic(
  () => import('@/components/hologram/NeuralCoreHologram'),
  { ssr: false },
);

const ChatBubble = dynamic(
  () => import('@/components/common/ChatBubble'),
  { ssr: false },
);

const OnekoCat = dynamic(
  () => import('@/components/common/OnekoCat'),
  { ssr: false },
);

export default function ClientWidgets() {
  return (
    <>
      <OnekoCat />
      <NeuralCoreHologram />
      <ChatBubble />
    </>
  );
}
