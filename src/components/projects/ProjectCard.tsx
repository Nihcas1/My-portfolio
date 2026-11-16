'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Project } from '@/types/project';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';
import { AskLink } from '../common/AskLink';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Card className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="group relative aspect-video overflow-hidden bg-muted/20">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={project.image}
            alt={project.title}
            width={1920}
            height={1080}
          />
          {project.video && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-xs">
                  <button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 group-hover:cursor-pointer hover:bg-white/30">
                    <PlayCircle />
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-4xl border-0 p-0">
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full rounded-lg object-cover"
                    src={project.video}
                    autoPlay
                    loop
                    controls
                  />
                </div>
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-5 flex-1">
        <div className="space-y-4">
          {/* Project Header - Title and Icons */}
          <div className="flex items-center justify-between gap-4">
            <Link href={project.projectDetailsPageSlug}>
              <h3 className="group-hover:text-primary text-xl leading-tight font-semibold hover:cursor-pointer">
                {project.title}
              </h3>
            </Link>
            {project.badge ? (
              <span
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  project.badgeType === 'production'
                    ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : project.badgeType === 'internal'
                      ? 'border border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                      : 'border border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    project.badgeType === 'production'
                      ? 'bg-emerald-400 animate-pulse'
                      : project.badgeType === 'internal'
                        ? 'bg-cyan-400'
                        : 'bg-amber-400'
                  }`}
                />
                {project.badge}
              </span>
            ) : project.github || project.link ? (
              <div className="flex shrink-0 items-center gap-2">
                {project.link && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View Website"
                      >
                        <Website />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Website</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {project.github && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-colors"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View GitHub"
                      >
                        <Github />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ) : null}
          </div>

          {/* Description */}
          <p className="text-secondary line-clamp-3">{project.description}</p>

          {/* Technologies */}
          <div>
            <h4 className="text-secondary mb-2 text-sm font-medium">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                      {technology.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{technology.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {project.details && (
        <CardFooter className="flex items-center justify-between gap-3 p-6 pt-0 mt-auto">
          <AskLink
            query={`Can you tell me about the architecture of "${project.title}" and Sachin's key contributions?`}
            variant="pill"
            className="text-xs py-1 px-3"
          >
            Ask AI
          </AskLink>
          <Link
            href={project.projectDetailsPageSlug}
            className="text-secondary hover:text-primary flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline font-medium"
          >
            Case Study <ArrowRight className="size-4" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
