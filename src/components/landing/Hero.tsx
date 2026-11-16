import { certificates } from '@/config/Achievements';
import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import StatusLine from './StatusLine';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

const shortNameMap: Record<string, string> = {
  'Professional Machine Learning Engineer (PMLE)': 'GCP PMLE',
  'Claude Code Architect Foundation (CCAF)': 'Anthropic CCAF',
  'Associate Cloud Engineer (ACE)': 'GCP ACE',
  'AWS Certified Cloud Practitioner (CLF-C02)': 'AWS Cloud Practitioner',
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key}>
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Image & Live Status */}
      <div className="flex flex-col gap-3">
        <Image
          src={avatar}
          alt="hero"
          width={100}
          height={100}
          className="size-24 rounded-full border border-border bg-muted/30 object-cover shadow-sm"
        />
        <StatusLine />
      </div>

      {/* Text Area */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Hi, I&apos;m {name}
          </h1>
          <p className="text-base font-semibold text-primary sm:text-lg md:text-xl">
            {title}
          </p>
        </div>

        {/* Verified Credly Credentials Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {certificates.map((cert) => {
            const shortLabel = shortNameMap[cert.title] || cert.title;
            return (
              <a
                key={cert.title}
                href={cert.credlyUrl || '/resume'}
                target={cert.credlyUrl ? '_blank' : undefined}
                rel={cert.credlyUrl ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-xs"
                title={`${cert.title} — ${cert.issuer}`}
              >
                <div className="relative size-4 overflow-hidden rounded-full">
                  <Image
                    src={cert.file}
                    alt={shortLabel}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="font-semibold text-[11px] tracking-tight sm:text-xs">
                  {shortLabel}
                </span>
                <CheckCircle2 className="size-3 text-emerald-500" />
                {cert.credlyUrl && (
                  <ExternalLink className="size-2.5 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100" />
                )}
              </a>
            );
          })}
        </div>

        <div className="mt-2 text-base leading-[2] text-neutral-500 md:text-lg">
          {renderDescription()}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500',
              )}
            >
              {IconComponent && <IconComponent />}
              <Link href={button.href}>{button.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="mt-8 flex gap-2">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                key={link.name}
                className="text-secondary flex items-center gap-2"
              >
                <span className="size-6">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
