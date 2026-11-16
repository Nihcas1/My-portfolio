'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export interface Certificate {
  file: string;
  title?: string;
  issuer?: string;
  date?: string;
  credlyUrl?: string;
}

interface CertificatesGalleryProps {
  certificates: Certificate[];
  className?: string;
}

export default function CertificatesGallery({
  certificates,
  className,
}: CertificatesGalleryProps) {
  const [active, setActive] = useState<string | null>(null);

  if (certificates.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-2xl font-semibold">No certificates found</h2>
        <p className="text-muted-foreground">
          Check back later for certificates and achievements!
        </p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const activeCert = certificates.find((c) => c.file === active);

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 ${className || ''}`}
      >
        {certificates.map((cert) => (
          <Card
            key={cert.file}
            className="group h-full w-full cursor-pointer overflow-hidden border-border/70 p-0 shadow-none transition-all hover:border-primary/40 dark:border-gray-800"
            onClick={() => setActive(cert.file)}
          >
            <CardHeader className="p-0">
              <div className="group bg-muted/20 relative aspect-video overflow-hidden">
                <Image
                  src={cert.file}
                  alt={cert.title || 'certificate'}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardHeader>

            <CardContent className="px-6 pt-4">
              <div className="space-y-1.5">
                <h3 className="group-hover:text-primary text-lg leading-tight font-semibold transition-colors">
                  {cert.title || 'Certificate'}
                </h3>
                {cert.issuer && (
                  <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-6 pt-0 pb-5">
              {cert.date && (
                <time className="text-muted-foreground text-xs" dateTime={cert.date}>
                  {formatDate(cert.date)}
                </time>
              )}
              {cert.credlyUrl ? (
                <a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <CheckCircle2 className="size-3" />
                  <span>Verify Credly</span>
                  <ExternalLink className="size-2.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-500">
                  <CheckCircle2 className="size-3" /> Verified
                </span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Fullscreen viewer */}
      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="bg-background/95 max-h-[90vh] w-full max-w-[90vw] border-0 p-0 backdrop-blur-sm">
          {active && (
            <>
              <DialogTitle className="sr-only">
                {activeCert?.title || 'Certificate'}
              </DialogTitle>
              <div className="flex h-60 items-center justify-center p-4 md:h-92">
                <div className="relative h-full w-full rounded-lg">
                  <Image
                    src={active}
                    alt={activeCert?.title || 'certificate'}
                    fill
                    unoptimized
                    className="rounded-lg object-contain"
                  />
                </div>
              </div>
              {activeCert && (
                <div className="flex flex-col gap-3 border-t px-6 pt-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                      {activeCert.title || 'Certificate'}
                    </h3>
                    {activeCert.issuer && (
                      <p className="text-muted-foreground text-sm">
                        {activeCert.issuer}
                      </p>
                    )}
                    {activeCert.date && (
                      <time
                        className="text-muted-foreground text-xs"
                        dateTime={activeCert.date}
                      >
                        {formatDate(activeCert.date)}
                      </time>
                    )}
                  </div>
                  {activeCert.credlyUrl && (
                    <a
                      href={activeCert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-500"
                    >
                      <CheckCircle2 className="size-3.5" />
                      <span>Verify on Credly</span>
                      <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
