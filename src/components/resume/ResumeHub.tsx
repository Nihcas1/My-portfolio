'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Download,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CertificateItem } from '@/config/Achievements';
import { resumeConfig } from '@/config/Resume';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ResumeHubProps {
  certificates: CertificateItem[];
}

type DomainFilter = 'all' | 'agentic' | 'rag' | 'gcp' | 'data';

const ATS_MARKDOWN_RESUME = `# SACHIN K
AI Engineer | Agentic AI & Generative AI Systems
Location: Coimbatore, India | Phone: +91 9597315323 | Email: asachin2318@gmail.com
LinkedIn: https://www.linkedin.com/in/k-sachin01/ | GitHub: https://github.com/Nihcas1

## PROFESSIONAL SUMMARY
AI Engineer with 2 years of experience building production Generative AI systems on Google Cloud. Specialized in agentic AI (Google ADK, LangGraph), Retrieval-Augmented Generation over Vertex AI Vector Search and Vertex AI Search, and event-driven ingestion pipelines in Python. Hands-on with prompt engineering, structured output generation, LLM evaluation, PII governance, and serverless backend services.

## TECHNICAL SKILLS
- Generative AI & LLMs: Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Flash, Prompt Engineering, Structured JSON Generation, Tool Calling, DeepEval (GEval), Guardrails, PII Redaction, Token & Cost Optimization
- Agentic AI: Google Agent Development Kit (ADK), LangGraph, LangChain, Multi-Agent Systems, Supervisor & Sub-Agent Architecture, Agent-as-Tool Composition, Sequential Agent Pipelines, Cyclic Graph Topologies, Vertex AI Agent Engine
- RAG & Vector Search: Vertex AI Vector Search (Matching Engine), Vertex AI Search (Discovery Engine), Pinecone, Semantic Search, gemini-embedding-001, text-embedding-005, Metadata Filtering, Token & Header Chunking, Query Reframing, Chunk Expansion Retrieval, Two-Stage Hydration
- Cloud & Backend: Google Cloud Platform (Vertex AI, Cloud Functions Gen 2, Cloud Run, BigQuery, GCS, Firestore, Cloud Scheduler), FastAPI, Flask, REST APIs, Pydantic v2, Webhooks, JWT (RS256), OAuth 2.0, OIDC ID Tokens, Serverless Functions
- Data Engineering & ML: ETL/ELT Pipelines, Event-Driven Ingestion (GCS Triggers), Web Crawling (BeautifulSoup, Scrapy, markdownify), Tokenization (tiktoken), Parameterized SQL, Idempotent Reindexing, Scikit-learn, TensorFlow, Keras, CNN, NLP

## PROFESSIONAL EXPERIENCE

### Searce Cosourcing Services Pvt Ltd — AI Engineer (Apr 2026 – Present)
Project: Conversational AI Assistant for a Streaming Platform (Production)
Tech: Python, LangGraph, LangChain, Gemini 2.0 Flash, Vertex AI Search (Discovery Engine), BigQuery, Pydantic v2, DeepEval, FastAPI, GCP
- Built the Linear EPG sub-agent as a server-side tool in a LangGraph supervisor architecture, implementing a cyclic START -> EPG -> TOOLS topology with Pydantic v2 self-repair retry loops to query, validate, and resolve schedules across 121 live channels.
- Reduced schedule query latency 45% by migrating linear retrieval from BigQuery NL2SQL to Vertex AI Search (Discovery Engine), indexing 44K+ daily broadcast records behind dynamic page-scaling heuristics and a thread-local client.
- Engineered a deterministic SGT (UTC+8) temporal grounding engine with daypart interval-overlap calculations, explicit meridian parsing, and fuzzy channel resolvers, resolving 95%+ of relative-time queries without repeated clarification turns.
- Eliminated 100% of live-match false positives by implementing an order-independent sports fixture parser and live-versus-replay classifier using regex boundary tokenizers to separate archive replays from live broadcasts.
- Designed a dual-consumer delegate protocol that streams synthesized Markdown commentary to the supervisor LLM while hydrating structured JSON payloads with deep-link URLs and poster assets for frontend carousels.
- Guaranteed zero regressions across channel disambiguation, title exclusion, and slot validation by automating dual-engine evaluation suites with DeepEval (GEval) and YAML-driven regression fixtures benchmarking Vertex AI Search against the legacy NL2SQL path.

### Cloudside Technologies Pvt Ltd — AI Engineer (Nov 2024 – Mar 2026)
- Multi-Agent Financial Guidance Platform (PoC): Built scheduled GOV.UK ingestion pipeline with recursive crawling and tiktoken chunking. Prevented stale regulatory content with atomic full-reindex cycle. Implemented FAQ retrieval agent tool generating 3072-dim vectors with category filtering. Enforced privacy compliance via post-conversation auditor masking 7 PII categories.
- Gong to Salesforce Agentic ETL Pipeline (PoC): Architected 3-stage agentic ETL pipeline using Google ADK SequentialAgent. Converted unstructured sales calls into structured MEDDPICC opportunity fields with Gemini 2.0 Flash. Authenticated to Salesforce via OAuth 2.0 JWT Bearer flow with RS256 assertions.
- Dual RAG Chatbots over Documentation and Source Code (PoC): Shipped RAG chatbots over automotive middleware docs and C++/Python source code using Matching Engine. Reduced LLM spend with cost-tier model cascade (Gemini 1.5 Flash query rewrite + Gemini 2.0 Flash synthesis). Maintained stateful multi-turn context via FirestoreChatMessageHistory.
- Figma to React Native Code Generator (Internal PoC): Built design-to-code pipeline converting Figma frames into React Native (TypeScript) with Gemini 2.5 Pro and hierarchical AST extraction.

## EDUCATION
- Master of Science, Data Analytics — Bharathiar University, Coimbatore (CGPA: 7.8 / 10 | 2022 – 2024)
- Bachelor of Science, Statistics — Government Arts College, Coimbatore (CGPA: 8.1 / 10 | 2019 – 2022)

## CERTIFICATIONS
- Professional Machine Learning Engineer (PMLE) — Google Cloud
- Claude Code Architect Foundation (CCAF) — Anthropic
- Associate Cloud Engineer (ACE) — Google Cloud
- AWS Certified Cloud Practitioner (CLF-C02) — Amazon Web Services
`;

const AI_PROMPTS = [
  {
    label: 'Top 3 Achievements',
    query: "What are Sachin's top 3 engineering accomplishments from his experience?",
  },
  {
    label: 'Streaming EPG Architecture',
    query: 'Explain the Linear EPG sub-agent LangGraph architecture and how Sachin reduced latency by 45%.',
  },
  {
    label: 'Enterprise RAG Stack',
    query: "Detail Sachin's expertise in Vertex AI Vector Search, chunking strategies, and Discovery Engine.",
  },
  {
    label: 'Candidate Fit Review',
    query: 'Provide an executive summary of why Sachin is a strong candidate for an AI / LLM Engineer role.',
  },
];

export default function ResumeHub({ certificates }: ResumeHubProps) {
  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const [activeDomain, setActiveDomain] = useState<DomainFilter>('all');
  const [copied, setCopied] = useState(false);

  const handleCopyAts = async () => {
    try {
      await navigator.clipboard.writeText(ATS_MARKDOWN_RESUME);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy ATS text:', err);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const triggerAiChat = (query: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { text: query, autoSend: true },
        }),
      );
    }
  };

  const isHighlighted = (domains: DomainFilter[]) => {
    if (activeDomain === 'all') return true;
    return domains.includes(activeDomain);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center print:hidden">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">
          <Sparkles className="size-3.5" />
          <span>Curriculum Vitae</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Resume / CV
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          AI Engineer with 2 years of experience building production Generative AI &amp; Agentic systems on Google Cloud.
        </p>
      </div>

      {/* Main View Switcher & Action Toolbar */}
      <div className="flex flex-col items-center gap-4 print:hidden">
        {/* Segmented View Switcher */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as 'interactive' | 'pdf')}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/80 border border-border/60 rounded-xl h-11">
            <TabsTrigger
              value="interactive"
              className="rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Code2 className="size-4 text-primary" />
              <span>Interactive Web View</span>
            </TabsTrigger>
            <TabsTrigger
              value="pdf"
              className="rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Award className="size-4 text-primary" />
              <span>PDF Document View</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button asChild variant="default" size="sm" className="gap-2 shadow-xs font-medium">
            <a href={resumeConfig.url} download={resumeConfig.downloadName}>
              <Download className="size-4" />
              <span>Download PDF</span>
              <span className="text-[10px] opacity-75 font-mono bg-primary-foreground/20 px-1.5 py-0.5 rounded">
                144 KB
              </span>
            </a>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyAts}
            className="gap-2 text-xs font-medium transition-all"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied for ATS!</span>
              </>
            ) : (
              <>
                <Copy className="size-4" />
                <span>Copy for ATS</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="gap-2 text-xs font-medium hidden sm:inline-flex"
          >
            <Printer className="size-4" />
            <span>Print / Save PDF</span>
          </Button>

          <Button asChild variant="ghost" size="sm" className="gap-2 text-xs">
            <a href="mailto:asachin2318@gmail.com">
              <Mail className="size-4" />
              <span>Email Directly</span>
            </a>
          </Button>
        </div>

        {/* Contextual AI Quick Chips */}
        <div className="w-full max-w-4xl pt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground font-mono inline-flex items-center gap-1.5 shrink-0">
              <Sparkles className="size-3.5 text-primary animate-pulse" />
              <span>Ask AI:</span>
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {AI_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => triggerAiChat(prompt.query)}
                  className="rounded-full border border-border/60 bg-muted/30 hover:bg-primary/10 hover:border-primary/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground transition-all cursor-pointer text-left"
                >
                  ⚡ {prompt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="print:hidden" />

      {/* Tab 1: Interactive Web View */}
      {activeTab === 'interactive' && (
        <div className="space-y-10 animate-in fade-in-50 duration-300">
          {/* Executive Summary Snapshot */}
          <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card/60 p-6 shadow-xs backdrop-blur-xs print:hidden">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase">Current Role</p>
                <p className="font-semibold text-foreground mt-0.5">AI Engineer</p>
                <p className="text-xs text-muted-foreground">Searce Cosourcing Services</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase">Specialization</p>
                <p className="font-semibold text-foreground mt-0.5">Agentic AI &amp; Enterprise RAG</p>
                <p className="text-xs text-muted-foreground">Google ADK, LangGraph, Vertex AI</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase">Education</p>
                <p className="font-semibold text-foreground mt-0.5">M.Sc Data Analytics</p>
                <p className="text-xs text-muted-foreground">B.Sc Statistics (CGPA 8.1)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase">Key Certifications</p>
                <p className="font-semibold text-foreground mt-0.5">Google Cloud PMLE &amp; CCAF</p>
                <p className="text-xs text-muted-foreground">GCP ACE • AWS CLF-C02</p>
              </div>
            </div>
          </div>

          {/* Recruiter Skill Domain Spotlight Filter */}
          <div className="mx-auto max-w-4xl space-y-2 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Filter className="size-3.5 text-primary" />
                <span>Recruiter Spotlight (Highlight by Domain):</span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                Filter highlights relevant experience &amp; skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Experience' },
                { id: 'agentic', label: '🤖 Agentic AI & LangGraph' },
                { id: 'rag', label: '🔍 Enterprise RAG & Search' },
                { id: 'gcp', label: '☁️ Google Cloud & Vertex AI' },
                { id: 'data', label: '📊 Data Analytics & ML' },
              ].map((domain) => (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActiveDomain(domain.id as DomainFilter)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border',
                    activeDomain === domain.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60',
                  )}
                >
                  {domain.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Certifications Section */}
          <div className="mx-auto max-w-4xl space-y-4 print:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="size-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">Verified Certifications</h2>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Google Cloud • Anthropic • AWS</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certificates.map((cert, idx) => {
                const isGcp = cert.issuer.includes('Google');
                const isMatch = isHighlighted(isGcp ? ['gcp'] : ['all']);

                return (
                  <div
                    key={idx}
                    className={cn(
                      'group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all',
                      isMatch
                        ? 'border-border/70 bg-card/40 hover:border-primary/40 hover:shadow-sm'
                        : 'border-border/30 bg-card/10 opacity-40',
                    )}
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/50 bg-black/20">
                      <Image
                        src={cert.file}
                        alt={cert.title}
                        fill
                        unoptimized
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-1">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                      {cert.credlyUrl ? (
                        <a
                          href={cert.credlyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-500 font-medium hover:underline hover:text-emerald-400 transition-colors"
                        >
                          <CheckCircle2 className="size-3" /> Credly ↗
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                          <CheckCircle2 className="size-3" /> Verified
                        </span>
                      )}
                      <span className="font-mono text-[10px]">{cert.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Interactive Resume Document View */}
          <div
            id="printable-resume-card"
            className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0"
          >
            {/* Resume Header */}
            <div className="border-b border-border/70 pb-6 text-center space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                SACHIN K
              </h2>
              <p className="text-base font-semibold text-primary">
                AI Engineer | Agentic AI and Generative AI
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" /> Coimbatore, India
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="size-3" /> +91 9597315323
                </span>
                <span>•</span>
                <a
                  href="mailto:asachin2318@gmail.com"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="size-3" /> asachin2318@gmail.com
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/k-sachin01/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://github.com/Nihcas1"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <BookOpen className="size-4" /> Professional Summary
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                AI Engineer with 2 years of experience building production Generative AI systems on Google Cloud. Specialized in agentic AI (Google ADK, LangGraph), Retrieval-Augmented Generation over Vertex AI Vector Search and Vertex AI Search, and event-driven ingestion pipelines in Python. Hands-on with prompt engineering, structured output generation, LLM evaluation, PII governance, and serverless backend services.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <Code2 className="size-4" /> Technical Skills
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div
                  className={cn(
                    'rounded-lg border p-3 space-y-1 transition-all',
                    isHighlighted(['agentic', 'rag', 'gcp'])
                      ? 'border-border/60 bg-muted/20'
                      : 'border-border/30 opacity-40',
                  )}
                >
                  <span className="font-semibold text-foreground">Generative AI &amp; LLMs:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Flash, Prompt Engineering, Structured JSON Generation, Tool Calling, DeepEval (GEval), Guardrails, PII Redaction, Token &amp; Cost Optimization
                  </p>
                </div>

                <div
                  className={cn(
                    'rounded-lg border p-3 space-y-1 transition-all',
                    isHighlighted(['agentic'])
                      ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20'
                      : isHighlighted(['all'])
                        ? 'border-border/60 bg-muted/20'
                        : 'border-border/30 opacity-40',
                  )}
                >
                  <span className="font-semibold text-foreground">Agentic AI:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Google Agent Development Kit (ADK), LangGraph, LangChain, Multi-Agent Systems, Supervisor &amp; Sub-Agent Architecture, Agent-as-Tool Composition, Sequential Agent Pipelines, Cyclic Graph Topologies, Vertex AI Agent Engine
                  </p>
                </div>

                <div
                  className={cn(
                    'rounded-lg border p-3 space-y-1 transition-all',
                    isHighlighted(['rag'])
                      ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20'
                      : isHighlighted(['all'])
                        ? 'border-border/60 bg-muted/20'
                        : 'border-border/30 opacity-40',
                  )}
                >
                  <span className="font-semibold text-foreground">RAG &amp; Vector Search:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Vertex AI Vector Search (Matching Engine), Vertex AI Search (Discovery Engine), Pinecone, Semantic Search, gemini-embedding-001, text-embedding-005, Metadata Filtering, Token &amp; Header Chunking, Query Reframing, Chunk Expansion Retrieval, Two-Stage Hydration
                  </p>
                </div>

                <div
                  className={cn(
                    'rounded-lg border p-3 space-y-1 transition-all',
                    isHighlighted(['gcp'])
                      ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20'
                      : isHighlighted(['all'])
                        ? 'border-border/60 bg-muted/20'
                        : 'border-border/30 opacity-40',
                  )}
                >
                  <span className="font-semibold text-foreground">Cloud &amp; Backend:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Google Cloud Platform (Vertex AI, Cloud Functions Gen 2, Cloud Run, BigQuery, GCS, Firestore, Cloud Scheduler), FastAPI, Flask, REST APIs, Pydantic v2, Webhooks, JWT (RS256), OAuth 2.0, OIDC ID Tokens, Serverless Functions
                  </p>
                </div>

                <div
                  className={cn(
                    'rounded-lg border p-3 space-y-1 sm:col-span-2 transition-all',
                    isHighlighted(['data'])
                      ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/20'
                      : isHighlighted(['all'])
                        ? 'border-border/60 bg-muted/20'
                        : 'border-border/30 opacity-40',
                  )}
                >
                  <span className="font-semibold text-foreground">Data Engineering &amp; ML:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    ETL/ELT Pipelines, Event-Driven Ingestion (GCS Triggers), Web Crawling (BeautifulSoup, Scrapy, markdownify), Tokenization (tiktoken), Parameterized SQL, Idempotent Reindexing, Scikit-learn, TensorFlow, Keras, CNN, NLP
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <Briefcase className="size-4" /> Professional Experience
              </div>

              {/* Searce */}
              <div
                className={cn(
                  'space-y-3 transition-all',
                  isHighlighted(['agentic', 'rag', 'gcp']) ? 'opacity-100' : 'opacity-40',
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      Searce Cosourcing Services Pvt Ltd
                    </h3>
                    <p className="text-xs text-primary font-medium">
                      AI Engineer
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Apr 2026 – Present
                  </span>
                </div>

                <div
                  className={cn(
                    'rounded-lg border p-4 space-y-3 text-xs leading-relaxed transition-all',
                    isHighlighted(['agentic', 'rag'])
                      ? 'border-primary/40 bg-card/70 shadow-xs'
                      : 'border-border/60 bg-muted/20',
                  )}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground text-sm flex items-center justify-between">
                      <span>Conversational AI Assistant for a Streaming Platform (Production)</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-normal">
                        Production Live
                      </span>
                    </span>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Python, LangGraph, LangChain, Gemini 2.0 Flash, Vertex AI Search (Discovery Engine), BigQuery, Pydantic v2, DeepEval, FastAPI, GCP
                    </p>
                  </div>

                  <p className="text-muted-foreground italic">
                    Scope of ownership: Linear EPG sub-agent within a LangGraph supervisor graph routing to FAQ, VOD search, subscription, recommendation, and memory tools.
                  </p>

                  <ul className="space-y-2 list-disc list-outside pl-4 text-muted-foreground">
                    <li>
                      Built the Linear EPG sub-agent as a server-side tool in a LangGraph supervisor architecture, implementing a cyclic START to EPG to TOOLS topology with Pydantic v2 self-repair retry loops to query, validate, and resolve schedules across 121 live channels.
                    </li>
                    <li>
                      Reduced schedule query latency 45% by migrating linear retrieval from BigQuery NL2SQL to Vertex AI Search (Discovery Engine), indexing 44K+ daily broadcast records behind dynamic page-scaling heuristics and a thread-local client.
                    </li>
                    <li>
                      Engineered a deterministic SGT (UTC+8) temporal grounding engine with daypart interval-overlap calculations, explicit meridian parsing, and fuzzy channel resolvers, resolving 95%+ of relative-time queries such as &quot;tonight&quot; and &quot;after midnight&quot; without repeated clarification turns.
                    </li>
                    <li>
                      Eliminated 100% of live-match false positives by implementing an order-independent sports fixture parser and live-versus-replay classifier using regex boundary tokenizers to separate archive replays from live broadcasts.
                    </li>
                    <li>
                      Designed a dual-consumer delegate protocol that streams synthesized Markdown commentary to the supervisor LLM while hydrating structured JSON payloads with deep-link URLs and poster assets for frontend carousels.
                    </li>
                    <li>
                      Guaranteed zero regressions across channel disambiguation, title exclusion, and slot validation by automating dual-engine evaluation suites with DeepEval (GEval) and YAML-driven regression fixtures benchmarking Vertex AI Search against the legacy NL2SQL path.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cloudside */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      Cloudside Technologies Pvt Ltd
                    </h3>
                    <p className="text-xs text-primary font-medium">AI Engineer</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    Nov 2024 – Mar 2026
                  </span>
                </div>

                {/* PoC 1: Financial Guidance Platform */}
                <div
                  className={cn(
                    'rounded-lg border p-4 space-y-3 text-xs leading-relaxed transition-all',
                    isHighlighted(['agentic', 'rag', 'gcp'])
                      ? 'border-border/60 bg-muted/20 opacity-100'
                      : 'border-border/30 opacity-40',
                  )}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground text-sm">
                      Multi-Agent Financial Guidance Platform (PoC)
                    </span>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Python, Google ADK, Vertex AI, Gemini, Vector Search, BigQuery, Cloud Functions, Cloud Scheduler, LangChain, Pydantic, BeautifulSoup
                    </p>
                  </div>
                  <ul className="space-y-2 list-disc list-outside pl-4 text-muted-foreground">
                    <li>
                      Built the scheduled GOV.UK ingestion pipeline end to end with depth-limited recursive crawling, domain scoping, URL normalization, visited-set deduplication, and cascading DOM selector fallbacks converting HTML to Markdown chunked with tiktoken.
                    </li>
                    <li>
                      Prevented stale regulatory content with an atomic full-reindex cycle purging vector datapoints, upserting fresh embeddings, truncating/reloading BigQuery, and cleaning up staged GCS resources.
                    </li>
                    <li>
                      Raised answer completeness by building a chunk-expansion retriever resolving top-k semantic hits to parent pages, reassembling sibling chunks in order with deduplicated source citations.
                    </li>
                    <li>
                      Implemented the FAQ retrieval agent tool as a two-stage pipeline generating 3072-dimensional gemini-embedding-001 vectors with QA-optimized task typing, filtering a shared index by category namespace, and hydrating answers from BigQuery by ID.
                    </li>
                    <li>
                      Enforced data-privacy compliance by building a post-conversation auditor that pulls session transcripts from Agent Engine, masks 7 categories of PII, classifies sessions against a fixed regulatory taxonomy via Gemini with Pydantic response schema, and deletes the source session.
                    </li>
                  </ul>
                </div>

                {/* PoC 2: Gong to Salesforce */}
                <div
                  className={cn(
                    'rounded-lg border p-4 space-y-3 text-xs leading-relaxed transition-all',
                    isHighlighted(['agentic', 'gcp'])
                      ? 'border-border/60 bg-muted/20 opacity-100'
                      : 'border-border/30 opacity-40',
                  )}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground text-sm">
                      Gong to Salesforce Agentic ETL Pipeline (PoC)
                    </span>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Python, Google ADK, SequentialAgent, Gemini 2.0 Flash, Cloud Functions, FastAPI, GCS, Salesforce REST API, JWT
                    </p>
                  </div>
                  <ul className="space-y-2 list-disc list-outside pl-4 text-muted-foreground">
                    <li>
                      Automated post-call CRM enrichment by architecting a 3-stage agentic ETL pipeline (Fetch, Transform, Load) using Google ADK SequentialAgent, enforcing non-bypassable stage ordering so partial runs cannot corrupt Salesforce records.
                    </li>
                    <li>
                      Converted unstructured sales conversations into structured MEDDPICC opportunity fields by prompting Gemini 2.0 Flash over merged call transcripts, replacing manual CRM data entry.
                    </li>
                    <li>
                      Minted OIDC ID tokens from Application Default Credentials, authenticated to Salesforce using OAuth 2.0 JWT Bearer flow with RS256 assertions, and achieved fault isolation per record during sObject inserts.
                    </li>
                  </ul>
                </div>

                {/* PoC 3: Dual RAG Chatbots */}
                <div
                  className={cn(
                    'rounded-lg border p-4 space-y-3 text-xs leading-relaxed transition-all',
                    isHighlighted(['rag', 'gcp'])
                      ? 'border-border/60 bg-muted/20 opacity-100'
                      : 'border-border/30 opacity-40',
                  )}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground text-sm">
                      Dual RAG Chatbots over Documentation and Source Code (PoC)
                    </span>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Python, Vertex AI, Gemini, Matching Engine, Scrapy, BeautifulSoup, Firestore, LangChain, Cloud Functions, Pandas
                    </p>
                  </div>
                  <ul className="space-y-2 list-disc list-outside pl-4 text-muted-foreground">
                    <li>
                      Shipped RAG chatbot services answering technical queries over versioned automotive middleware documentation and C++/Python source code, tagging every datapoint with a version restrict namespace.
                    </li>
                    <li>
                      Reduced LLM spend on multi-turn sessions with a cost-tier model cascade: Gemini 1.5 Flash capped at 50 output tokens rewrites follow-ups into standalone queries, while Gemini 2.0 Flash streams structured synthesis with deterministic decoding.
                    </li>
                    <li>
                      Maintained stateful multi-turn context using LangChain FirestoreChatMessageHistory with byte-budget-aware trimming and in-memory version-keyed caching.
                    </li>
                  </ul>
                </div>

                {/* PoC 4: Figma to React Native */}
                <div
                  className={cn(
                    'rounded-lg border p-4 space-y-3 text-xs leading-relaxed transition-all',
                    isHighlighted(['agentic'])
                      ? 'border-border/60 bg-muted/20 opacity-100'
                      : 'border-border/30 opacity-40',
                  )}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground text-sm">
                      Figma to React Native Code Generator (Internal PoC)
                    </span>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Python, Gemini 2.5 Pro, Figma REST API, Streamlit
                    </p>
                  </div>
                  <ul className="space-y-2 list-disc list-outside pl-4 text-muted-foreground">
                    <li>
                      Built an AI design-to-code pipeline converting Figma frames into React Native (TypeScript) components, driven by a hierarchical schema extractor that recursively walks the document tree to capture frame hierarchy, prototype navigation links, and deduplicated components.
                    </li>
                    <li>
                      Constructed multimodal prompts interleaving rendered frame images, raw node JSON, and per-frame assets so the model resolves exact asset filenames with schema-as-source-of-truth zero-temperature decoding.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Personal Projects */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Education */}
              <div
                className={cn(
                  'space-y-3 transition-all',
                  isHighlighted(['data']) ? 'opacity-100' : 'opacity-100',
                )}
              >
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <GraduationCap className="size-4" /> Education
                </div>
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                    <p className="font-bold text-foreground">Master of Science, Data Analytics</p>
                    <p className="text-muted-foreground">Bharathiar University, Coimbatore</p>
                    <p className="text-[11px] text-primary font-mono">CGPA: 7.8 / 10 • Aug 2022 – Apr 2024</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                    <p className="font-bold text-foreground">Bachelor of Science, Statistics</p>
                    <p className="text-muted-foreground">Government Arts College, Coimbatore</p>
                    <p className="text-[11px] text-primary font-mono">CGPA: 8.1 / 10 • Jun 2019 – Jun 2022</p>
                  </div>
                </div>
              </div>

              {/* Personal Projects */}
              <div
                className={cn(
                  'space-y-3 transition-all',
                  isHighlighted(['rag', 'data']) ? 'opacity-100' : 'opacity-100',
                )}
              >
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <Cpu className="size-4" /> Personal Projects
                </div>
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                    <p className="font-bold text-foreground">Snowflake Documentation RAG Chatbot</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Embedded PDF knowledge base into Pinecone vector database with Gemini API and Streamlit UI, falling back to official docs on low confidence.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-1">
                    <p className="font-bold text-foreground">Audio Emotion Recognition</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Trained CNN emotion classifier on 40 MFCC acoustic features with SMOTE class balancing and sequence padding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PDF Document View */}
      {activeTab === 'pdf' && (
        <div className="space-y-4 animate-in fade-in-50 duration-300">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            {/* Window Titlebar */}
            <div className="border-b border-border bg-muted/40 px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-red-400/80 inline-block" />
                <span className="size-2.5 rounded-full bg-yellow-400/80 inline-block" />
                <span className="size-2.5 rounded-full bg-green-400/80 inline-block" />
                <span className="ml-2 font-medium font-sans text-foreground">
                  {resumeConfig.downloadName}
                </span>
                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground hidden sm:inline-block">
                  144 KB PDF
                </span>
              </div>
              <div className="flex items-center gap-3 font-sans">
                <a
                  href={resumeConfig.url}
                  download={resumeConfig.downloadName}
                  className="hover:text-foreground transition-colors flex items-center gap-1 font-medium text-xs"
                >
                  <Download className="size-3.5" /> Download
                </a>
                <a
                  href={resumeConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1 font-medium text-xs"
                >
                  Full Screen <Maximize2 className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Native PDF Viewer */}
            <object
              data={`${resumeConfig.url}#toolbar=1&navpanes=0`}
              type="application/pdf"
              className="h-[880px] w-full border-0 bg-white dark:bg-neutral-900"
            >
              <iframe
                src={`${resumeConfig.url}#toolbar=1`}
                title="Sachin K Resume"
                className="h-[880px] w-full border-0 bg-white dark:bg-neutral-900"
              />
            </object>
          </div>

          <p className="text-center text-xs text-muted-foreground font-mono">
            💡 Tip: On mobile devices, the{' '}
            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className="text-primary underline cursor-pointer"
            >
              Interactive Web View
            </button>{' '}
            provides the smoothest reading experience.
          </p>
        </div>
      )}
    </div>
  );
}
