import Python from '@/components/technologies/Python';
import GoogleADK from '@/components/technologies/GoogleADK';
import VertexAI from '@/components/technologies/VertexAI';
import FastAPI from '@/components/technologies/FastAPI';
import BigQuery from '@/components/technologies/BigQuery';
import Gemini from '@/components/technologies/Gemini';
import LangChain from '@/components/technologies/LangChain';
import LangGraph from '@/components/technologies/LangGraph';
import CloudFunctions from '@/components/technologies/CloudFunctions';
import React from 'react';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'Searce Cosourcing Services Pvt Ltd',
    position: 'AI Engineer',
    location: 'Coimbatore, India',
    image: '/company/searceinc.png',
    description: [
      '**Conversational AI Assistant for a Streaming Platform (Production):** Built the Linear EPG sub-agent as a server-side tool in a LangGraph supervisor architecture, implementing a cyclic START to EPG to TOOLS topology with Pydantic v2 self-repair retry loops to query, validate and resolve schedules across 121 live channels.',
      'Reduced schedule query latency 45% by migrating linear retrieval from BigQuery NL2SQL to Vertex AI Search (Discovery Engine), indexing 44K+ daily broadcast records behind dynamic page-scaling heuristics and a thread-local client.',
      'Engineered a deterministic SGT (UTC+8) temporal grounding engine with daypart interval-overlap calculations, explicit meridian parsing and fuzzy channel resolvers, resolving 95%+ of relative-time queries such as "tonight" and "after midnight" without repeated clarification turns.',
      'Eliminated 100% of live-match false positives by implementing an order-independent sports fixture parser and live-versus-replay classifier using regex boundary tokenizers to separate archive replays from live broadcasts.',
      'Designed a dual-consumer delegate protocol that streams synthesized Markdown commentary to the supervisor LLM while hydrating structured JSON payloads with deep-link URLs and poster assets for frontend carousels.',
      'Guaranteed zero regressions across channel disambiguation, title exclusion and slot validation by automating dual-engine evaluation suites with DeepEval (GEval) and YAML-driven regression fixtures benchmarking Vertex AI Search against the legacy NL2SQL path.',
    ],
    startDate: 'Apr 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
      },
      {
        name: 'LangGraph',
        href: 'https://www.langchain.com/langgraph',
        icon: <LangGraph />,
      },
      {
        name: 'Gemini 2.0 Flash',
        href: 'https://deepmind.google/technologies/gemini/',
        icon: <Gemini />,
      },
      {
        name: 'Vertex AI',
        href: 'https://cloud.google.com/vertex-ai',
        icon: <VertexAI />,
      },
      {
        name: 'FastAPI',
        href: 'https://fastapi.tiangolo.com/',
        icon: <FastAPI />,
      },
      {
        name: 'BigQuery',
        href: 'https://cloud.google.com/bigquery',
        icon: <BigQuery />,
      },
    ],
    website: 'https://www.searce.com/',
    linkedin: 'https://www.linkedin.com/in/k-sachin01/',
    github: 'https://github.com/Nihcas1/',
  },
  {
    isCurrent: false,
    company: 'Cloudside Technologies Pvt Ltd',
    position: 'AI Engineer',
    location: 'Coimbatore, India',
    image: '/company/Cloudside.png',
    description: [
      '**Multi-Agent Financial Guidance Platform (PoC):** Built the scheduled GOV.UK ingestion pipeline end to end, implementing a depth-limited recursive crawler with domain scoping, URL normalization, visited-set deduplication and configurable rate limiting to discover regulatory guidance pages.',
      'Extracted clean page content using cascading DOM selector fallbacks with relative-to-absolute link rewriting, converted HTML to Markdown, and chunked text into fixed-token segments with tiktoken for embedding-window alignment.',
      'Prevented stale regulatory content from reaching users with an atomic full-reindex cycle that purges prior vector datapoints, upserts fresh embeddings, truncates and reloads BigQuery, and cleans up staged GCS resources per run.',
      'Raised answer completeness on regulatory queries by building a chunk-expansion retriever that resolves top-k semantic hits to their parent page, reassembles all sibling chunks in order, and returns whole pages with deduplicated source-link citations.',
      'Automated FAQ reindexing through a GCS-triggered pipeline converting uploaded .docx to Markdown and splitting per question on header boundaries using LangChain MarkdownHeaderTextSplitter.',
      'Implemented the FAQ retrieval agent tool as a two-stage pipeline generating 3072-dimensional gemini-embedding-001 vectors with QA-optimized task typing, filtering a shared index by category namespace, then hydrating full answers from BigQuery by ID to keep index storage lean.',
      'Enforced data-privacy compliance by building a post-conversation auditor that pulls session transcripts from Agent Engine, masks 7 categories of PII and classifies sessions against a fixed regulatory taxonomy via Gemini with a Pydantic response schema, persists audited records to BigQuery, and then deletes the source session.',
      '**Gong to Salesforce Agentic ETL Pipeline (PoC):** Automated post-call CRM enrichment by architecting a 3-stage agentic ETL pipeline (Fetch, Transform, Load) using Google ADK SequentialAgent, enforcing non-bypassable stage ordering so partial runs cannot corrupt Salesforce records.',
      'Converted unstructured sales conversations into structured MEDDPICC opportunity fields by prompting Gemini 2.0 Flash over merged call transcripts, replacing manual CRM data entry by sales representatives.',
      'Removed static API keys from the pipeline by minting OIDC ID tokens from Application Default Credentials and propagating the resolved IAM principal on every service-to-service request.',
      'Authenticated to Salesforce using the OAuth 2.0 JWT Bearer flow, signing RS256 assertions with a PEM private key for short-lived access tokens without storing user credentials.',
      'Achieved partial-success durability by isolating faults per record during Salesforce sObject inserts, returning inserted record IDs alongside per-record error diagnostics instead of failing the whole batch.',
      '**Dual RAG Chatbots over Documentation and Source Code (PoC):** Shipped RAG chatbot services answering technical queries over versioned automotive middleware documentation and C++ and Python source code, tagging every datapoint with a version restrict namespace so retrieval never returns documentation for the wrong release.',
      'Built ingestion pipeline to breadth-first crawl offline HTML documentation trees, extracting source files across 70+ code extensions into a unified embedding corpus with exponential-backoff retries and 1000-datapoint batched upserts.',
      'Reduced LLM spend on multi-turn sessions with a cost-tier model cascade: Gemini 1.5 Flash for query rewrites, Gemini 2.0 Flash for structured synthesis; maintained stateful multi-turn context with LangChain FirestoreChatMessageHistory.',
      '**Figma to React Native Code Generator (Internal PoC):** Reduced manual frontend scaffolding effort by building an AI design-to-code pipeline converting Figma frames into React Native (TypeScript) components using Gemini 2.5 Pro and Figma REST API, with multimodal prompts interleaving frame images and raw node JSON.',
    ],
    startDate: 'Nov 2024',
    endDate: 'Mar 2026',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
      },
      {
        name: 'Google ADK',
        href: 'https://google.github.io/adk-docs/',
        icon: <GoogleADK />,
      },
      {
        name: 'Vertex AI',
        href: 'https://cloud.google.com/vertex-ai',
        icon: <VertexAI />,
      },
      {
        name: 'Gemini',
        href: 'https://deepmind.google/technologies/gemini/',
        icon: <Gemini />,
      },
      {
        name: 'FastAPI',
        href: 'https://fastapi.tiangolo.com/',
        icon: <FastAPI />,
      },
      {
        name: 'BigQuery',
        href: 'https://cloud.google.com/bigquery',
        icon: <BigQuery />,
      },
      {
        name: 'Cloud Functions',
        href: 'https://cloud.google.com/functions',
        icon: <CloudFunctions />,
      },
      {
        name: 'LangChain',
        href: 'https://www.langchain.com/',
        icon: <LangChain />,
      },
    ],
    website: 'https://cloudsidetechnologies.com',
    linkedin: 'https://www.linkedin.com/in/k-sachin01/',
    github: 'https://github.com/Nihcas1/',
  },
];
