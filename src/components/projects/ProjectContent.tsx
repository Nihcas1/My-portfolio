import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProjectCaseStudyFrontmatter } from '@/types/project';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';

import Github from '../svgs/Github';
import Website from '../svgs/Website';
import { AskLink } from '../common/AskLink';
import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
  const {
    title,
    description,
    image,
    technologies,
    github,
    live,
    timeline,
    role,
    team,
    status,
    challenges,
    learnings,
  } = frontmatter;

  const statusVariant =
    status === 'production' || status === 'completed'
      ? 'default'
      : status === 'in-progress'
        ? 'secondary'
        : 'outline';

  return (
    <article className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8 space-y-6">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          {/* Project Status and Technologies */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={statusVariant} className="text-sm">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            {technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{technologies.length - 3} more
              </Badge>
            )}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {title}
          </h1>

          <p className="text-muted-foreground text-xl">{description}</p>

          {/* Project Meta Information */}
          <div className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Timeline
              </h5>
              <p className="text-sm">{timeline}</p>
            </div>
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Role
              </h5>
              <p className="text-sm">{role}</p>
            </div>
            {team && (
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Team
                </h5>
                <p className="text-sm">{team}</p>
              </div>
            )}
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Status
              </h5>
              <Badge variant={statusVariant} className="text-xs">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {!live && !github && (
              <div
                className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium ${
                  frontmatter.tier === 'production' || title.toLowerCase().includes('mewatch')
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    frontmatter.tier === 'production' || title.toLowerCase().includes('mewatch')
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-amber-400'
                  }`}
                />
                {frontmatter.tier === 'production' || title.toLowerCase().includes('mewatch')
                  ? 'Production System (Mediacorp) — Proprietary Code'
                  : 'Enterprise / Client PoC — Source Code Confidential'}
              </div>
            )}
            {live && (
              <Button asChild>
                <Link
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Website className="size-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {github && (
              <Button variant="outline" asChild>
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="size-4" />
                  Source Code
                </Link>
              </Button>
            )}
            <AskLink
              query={`Can you walk me through the engineering details and architecture of the ${title} project?`}
              variant="button"
            >
              Ask AI About This Project
            </AskLink>
          </div>
        </div>

        <Separator />
      </header>

      {/* Technology Stack */}
      <div className="mb-8">
        <div className="bg-muted/20 rounded-lg border p-4">
          <h3 className="mb-3 text-lg font-semibold">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges and Learnings */}
      {(challenges?.length || learnings?.length) && (
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {challenges && challenges.length > 0 && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Key Challenges
              </h3>
              <ul className="space-y-2">
                {challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
                  >
                    <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {learnings && learnings.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
              <h3 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
                  >
                    <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={content}
          components={ProjectComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypeHighlight,
                  {
                    theme: 'github-dark',
                  },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Discussion Callout */}
      <div className="mt-12 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/20 via-background to-sky-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-foreground">Interested in this implementation?</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Ask my Virtual Assistant about the technical tradeoffs, latency optimizations, or scaling architecture.
          </p>
        </div>
        <AskLink
          query={`How did Sachin handle scalability and production deployment for ${title}?`}
          variant="button"
          className="whitespace-nowrap px-4 py-2"
        >
          Discuss Architecture
        </AskLink>
      </div>
    </article>
  );
}
