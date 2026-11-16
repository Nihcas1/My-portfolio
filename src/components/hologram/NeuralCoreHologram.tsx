'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Atom,
  Check,
  Code2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Layers,
  Maximize2,
  MessageSquare,
  Minimize2,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import NeuralCoreCanvas, { CoreColorMode } from './NeuralCoreCanvas';
import { resumeConfig } from '@/config/Resume';
import { cn } from '@/lib/utils';

interface ColorThemeOption {
  id: CoreColorMode;
  label: string;
  badge: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  glowColor: string;
}

const COLOR_MODES: ColorThemeOption[] = [
  {
    id: 'cyan',
    label: 'Cyan',
    badge: 'CORE_CYAN',
    borderColor: 'border-cyan-500/50',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    glowColor: 'shadow-[0_0_25px_rgba(6,182,212,0.4)]',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    badge: 'CORE_EMERALD',
    borderColor: 'border-emerald-500/50',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.4)]',
  },
  {
    id: 'purple',
    label: 'Violet',
    badge: 'CORE_VIOLET',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.4)]',
  },
  {
    id: 'amber',
    label: 'Amber',
    badge: 'CORE_AMBER',
    borderColor: 'border-amber-500/50',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]',
  },
];

const PORTFOLIO_SPECS = [
  {
    icon: <Sparkles className="size-3.5 text-cyan-400" />,
    title: 'AI Assistant Engine',
    name: 'Google Gemini 2.5 Flash Lite',
    detail: 'Real-time SSE token streaming via Next.js API route (/api/chat) with thinking budget set to 0 for instant response.',
  },
  {
    icon: <Layers className="size-3.5 text-blue-400" />,
    title: 'Frontend Framework',
    name: 'Next.js 15 (App Router) + React 19',
    detail: 'Modular architecture separating Server Components from lazy-loaded Client Widgets for sub-200ms cold navigation.',
  },
  {
    icon: <Zap className="size-3.5 text-yellow-400" />,
    title: 'Runtime & Bundler',
    name: 'Bun + Turbopack',
    detail: 'High-performance JavaScript runtime with Turbopack incremental module graph compilation.',
  },
  {
    icon: <Atom className="size-3.5 text-purple-400" />,
    title: '3D Interactive Graphics',
    name: 'Three.js WebGL Core',
    detail: 'GPU-accelerated geodesic icosahedron lattice, dynamic orbital rings, and ambient particle field.',
  },
  {
    icon: <Code2 className="size-3.5 text-emerald-400" />,
    title: 'Styling & Design System',
    name: 'Tailwind CSS 4',
    detail: 'Semantic design tokens with full native dark and light theme adaptability.',
  },
];

export default function NeuralCoreHologram() {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldExpanded, setFieldExpanded] = useState(false);
  const [colorMode, setColorMode] = useState<CoreColorMode>('cyan');
  const [copiedContact, setCopiedContact] = useState(false);

  const activeTheme =
    COLOR_MODES.find((m) => m.id === colorMode) || COLOR_MODES[0];

  const triggerChatQuery = (text: string) => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { text, autoSend: true },
        }),
      );
    }
  };

  const copyContactCard = async () => {
    try {
      await navigator.clipboard.writeText(
        'Sachin K | AI Engineer\nEmail: asachin2318@gmail.com\nPhone / WhatsApp: +91 9597315323\nLinkedIn: https://www.linkedin.com/in/k-sachin01/\nGitHub: https://github.com/Nihcas1',
      );
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2500);
    } catch (e) {
      console.error('Failed to copy contact card:', e);
    }
  };

  return (
    <>
      {/* Resting Hologram Orb (Bottom-Left Corner) */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            'group relative flex size-14 sm:size-16 items-center justify-center rounded-full border bg-black/85 p-1 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer',
            activeTheme.borderColor,
            activeTheme.glowColor,
          )}
          title="Portfolio Tech Stack & 3D Core • Click to inspect"
        >
          {/* Subtle outer pulsing ring */}
          <span
            className={cn(
              'absolute inset-0 rounded-full border animate-ping opacity-25 pointer-events-none',
              activeTheme.borderColor,
            )}
          />

          {/* Mini 3D canvas */}
          <div className="size-full overflow-hidden rounded-full pointer-events-none">
            <NeuralCoreCanvas
              isExpanded={false}
              interactive={false}
              colorMode={colorMode}
            />
          </div>

          {/* Tooltip on hover */}
          <span className="pointer-events-none absolute bottom-full mb-2 left-0 hidden whitespace-nowrap rounded-md border border-border/80 bg-black/95 px-2.5 py-1 text-[11px] font-mono text-cyan-300 opacity-0 shadow-lg transition-opacity duration-200 group-hover:block group-hover:opacity-100">
            <span className="flex items-center gap-1.5">
              <Cpu className="size-3 text-cyan-400" />
              <span>Portfolio Tech Stack &amp; Core</span>
            </span>
          </span>
        </button>
      </div>

      {/* Enlarged Portfolio Tech Stack Inspector Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl max-h-[92vh] border border-border/80 bg-background/98 p-0 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-foreground"
        >
          <DialogTitle className="sr-only">
            Portfolio Architecture &amp; Tech Stack Inspector
          </DialogTitle>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-6 py-3.5 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-cyan-500" />
              </span>
              <div>
                <span className="font-bold tracking-wider font-mono text-foreground text-sm">
                  PORTFOLIO ARCHITECTURE // TECH STACK
                </span>
                <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline font-sans">
                  • Behind the Scenes of this Portfolio
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFieldExpanded(!fieldExpanded)}
                className="h-7 text-xs font-medium"
              >
                {fieldExpanded ? (
                  <>
                    <Minimize2 className="mr-1 size-3" />
                    <span>Lattice View</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="mr-1 size-3" />
                    <span>Expand Field</span>
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                title="Close Modal"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Main Content: 2-Column Split */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column (5 cols): 3D Three.js Interactive Model & Color Tuning */}
            <div className="md:col-span-5 flex flex-col space-y-3">
              <div className="relative h-60 sm:h-64 w-full rounded-2xl border border-border/70 bg-black/90 overflow-hidden shadow-inner">
                <NeuralCoreCanvas
                  isExpanded={true}
                  interactive={true}
                  fieldExpanded={fieldExpanded}
                  colorMode={colorMode}
                />
                <div className="pointer-events-none absolute bottom-2 inset-x-0 text-center font-mono text-[10px] text-muted-foreground/80">
                  Drag to rotate 360° • Scroll to zoom
                </div>
              </div>

              {/* 3D Accent Color Selector */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground text-[11px]">3D Core Color Theme:</span>
                  <span className={cn('font-mono font-semibold text-[11px]', activeTheme.textColor)}>
                    {activeTheme.label}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setColorMode(mode.id)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-lg py-2 px-1 text-xs font-medium transition-all cursor-pointer border whitespace-nowrap',
                        colorMode === mode.id
                          ? cn(mode.bgColor, mode.borderColor, mode.textColor, 'font-bold shadow-xs')
                          : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border',
                      )}
                    >
                      <span className={cn('size-2 shrink-0 rounded-full', mode.bgColor, 'border', mode.borderColor)} />
                      <span className="truncate">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recruiter Action Buttons */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-2">
                <span className="text-[11px] font-medium text-foreground block">
                  Recruiter Fast Actions:
                </span>
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      triggerChatQuery(
                        "Can you summarize Sachin's experience and why he is a strong fit for Senior AI / ML Engineering roles?",
                      )
                    }
                    className="flex items-center justify-between w-full rounded-lg border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 px-3 py-2 text-xs transition-all text-left cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="size-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Ask AI About Sachin</span>
                    </span>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </button>

                  <a
                    href={resumeConfig.url}
                    download={resumeConfig.downloadName}
                    className="flex items-center justify-between w-full rounded-lg border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 px-3 py-2 text-xs transition-all text-left group"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="size-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Download Resume (PDF)</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">144 KB</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyContactCard}
                    className="flex items-center justify-between w-full rounded-lg border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 px-3 py-2 text-xs transition-all text-left cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      {copiedContact ? (
                        <Check className="size-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="size-3.5 text-primary group-hover:scale-110 transition-transform" />
                      )}
                      <span className={copiedContact ? 'text-emerald-500 font-semibold' : 'font-medium'}>
                        {copiedContact ? 'Copied Contact Info!' : 'Copy Contact Details'}
                      </span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">Email &amp; Phone</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): The Real Engineering Stack Behind This Portfolio */}
            <div className="md:col-span-7 space-y-3">
              <div className="border-b border-border/60 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Technologies Powering This Portfolio
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    An honest, transparent view of the software engineering stack running this site.
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                  ● 100% Verified
                </span>
              </div>

              {/* Specs List: 2-Column Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PORTFOLIO_SPECS.map((spec, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'rounded-xl border border-border/60 bg-card/60 p-3 space-y-1.5 transition-all hover:border-primary/30',
                      idx === PORTFOLIO_SPECS.length - 1 && 'sm:col-span-2',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        {spec.icon}
                        <span>{spec.title}</span>
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-primary shrink-0">
                        {spec.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-5">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground border-t border-border/50">
                <span className="text-[11px] font-mono">EXPLORE PORTFOLIO:</span>
                <div className="flex items-center gap-3">
                  <Link
                    href="/projects"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Projects <ExternalLink className="size-3" />
                  </Link>
                  <Link
                    href="/work-experience"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Experience <ExternalLink className="size-3" />
                  </Link>
                  <Link
                    href="/resume"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Resume <ExternalLink className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
