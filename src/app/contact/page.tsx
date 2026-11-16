import Container from '@/components/common/Container';
import ContactForm from '@/components/contact/ContactForm';
import { Separator } from '@/components/ui/separator';
import { contactConfig } from '@/config/Contact';
import { generateMetadata as getMetadata } from '@/config/Meta';
import LinkedIn from '@/components/svgs/LinkedIn';
import WhatsApp from '@/components/svgs/WhatsApp';
import Mail from '@/components/svgs/Mail';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {contactConfig.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {contactConfig.description}
          </p>
        </div>

        {/* Quick Direct Messaging Channels */}
        <div className="mx-auto max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://www.linkedin.com/in/k-sachin01/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-3 text-xs font-semibold text-blue-300 transition-colors shadow-xs"
          >
            <span className="size-4 shrink-0 flex items-center justify-center">
              <LinkedIn />
            </span>
            <span>Message on LinkedIn</span>
          </a>
          <a
            href="https://wa.me/919597315323?text=Hi%20Sachin,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3 text-xs font-semibold text-emerald-300 transition-colors shadow-xs"
          >
            <WhatsApp className="size-4 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href="mailto:asachin2318@gmail.com"
            className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted/70 px-4 py-3 text-xs font-semibold text-foreground transition-colors shadow-xs"
          >
            <span className="size-4 shrink-0 flex items-center justify-center">
              <Mail />
            </span>
            <span>Direct Email</span>
          </a>
        </div>

        <div className="mx-auto max-w-2xl flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Or Send a Message Here
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
