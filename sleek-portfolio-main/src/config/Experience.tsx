import Python from '@/components/technologies/Python';
import GoogleADK from '@/components/technologies/GoogleADK';
import VertexAI from '@/components/technologies/VertexAI';
import FastAPI from '@/components/technologies/FastAPI';
import BigQuery from '@/components/technologies/BigQuery';
import Gemini from '@/components/technologies/Gemini';
import LangChain from '@/components/technologies/LangChain';

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
    company: 'Searce Inc',
    position: 'AI Engineer',
    location: 'India',
    image: '/company/searceinc.png',
    description: [
      'Spearheading advanced AI initiatives and integrating cutting-edge machine learning models into production systems.',
    ],
    startDate: 'April 2026',
    endDate: 'Present',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
      },
      {
        name: 'Vertex AI',
        href: 'https://cloud.google.com/vertex-ai',
        icon: <VertexAI />,
      },
      {
        name: 'Google ADK',
        href: 'https://google.github.io/adk-docs/',
        icon: <GoogleADK />,
      },
      {
        name: 'Gemini',
        href: 'https://deepmind.google/technologies/gemini/',
        icon: <Gemini />,
      },
    ],
    website: 'https://www.searce.com/',
    linkedin: 'https://www.linkedin.com/in/k-sachin01/',
    github: 'https://github.com/Nihcas1/',
  },
  {
    isCurrent: false,
    company: 'Cloudside Technologies Pvt Ltd',
    position: 'ML Engineer',
    location: 'Coimbatore',
    image: '/company/Cloudside.png',
    description: [
      '**Financial Coach Assistant:** Architected a multi-agent RAG system (Google ADK, Vertex AI) with a hierarchical orchestrator routing queries to specialized agents, enabling scalable and modular query handling.',
      'Built end-to-end data pipelines (GCS, BigQuery, Vector Search) to ingest and process financial datasets, leveraging Gemini embeddings for context-aware retrieval.',
      'Deployed production-ready agents on Google Agent Engine, implementing media retrieval via vector similarity search and integrating with mobile applications.',
      '**Gong → Salesforce ETL Pipeline:** Architected and deployed a scalable, serverless ETL pipeline to automate ingestion of Gong sales call transcripts and metadata into Salesforce Opportunities using GCP.',
      'Designed a multi-agent orchestration system (Google ADK SequentialAgent) leveraging Gemini 2.0 Flash to convert unstructured conversations into structured CRM insights.',
      'Implemented secure integrations including Salesforce JWT authentication and IAM-based service-to-service communication, exposed via FastAPI.',
    ],
    startDate: 'January 2, 2025',
    endDate: 'March 31, 2026',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
      },
      {
        name: 'Vertex AI',
        href: 'https://cloud.google.com/vertex-ai',
        icon: <VertexAI />,
      },
      {
        name: 'Google ADK',
        href: 'https://google.github.io/adk-docs/',
        icon: <GoogleADK />,
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
        name: 'Gemini',
        href: 'https://deepmind.google/technologies/gemini/',
        icon: <Gemini />,
      },
    ],
    website: 'https://cloudsidetechnologies.com',
    linkedin: 'https://www.linkedin.com/in/k-sachin01/',
    github: 'https://github.com/Nihcas1/',
  },
  {
    isCurrent: false,
    company: 'Cloudside Technologies Pvt Ltd',
    position: 'ML Intern',
    location: 'Coimbatore',
    image: '/company/Cloudside.png',
    description: [
      '**Figma-to-React Native Code Generator:** Built an AI-powered design-to-code pipeline (Python, Figma API, Gemini 2.5 Pro) to convert Figma designs into production-ready React Native components.',
      'Engineered a multi-stage pipeline capturing layout structure, navigation flows, and component relationships for precise LLM context.',
      '**RAG Chatbot API:** Built and deployed a RAG-based chatbot API integrating Vertex AI and Matching Engine for low-latency semantic search over large-scale documentation.',
      'Designed an end-to-end retrieval pipeline with query reframing, context-aware retrieval, and structured response generation using Gemini.',
      'Implemented stateful conversation handling (Firestore, LangChain) with session-based memory and scalable backend services.',
    ],
    startDate: 'November 18, 2024',
    endDate: 'December 31, 2024',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
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
