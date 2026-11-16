import Python from '@/components/technologies/Python';
import GoogleADK from '@/components/technologies/GoogleADK';
import VertexAI from '@/components/technologies/VertexAI';
import FastAPI from '@/components/technologies/FastAPI';
import BigQuery from '@/components/technologies/BigQuery';
import Gemini from '@/components/technologies/Gemini';
import CloudFunctions from '@/components/technologies/CloudFunctions';
import Streamlit from '@/components/technologies/Streamlit';
import GCP from '@/components/technologies/GCP';
import Pinecone from '@/components/technologies/Pinecone';
import MachineLearning from '@/components/technologies/MachineLearning';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import LangGraph from '@/components/technologies/LangGraph';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'mewatch Conversational Agent (Linear EPG Sub-Agent)',
    description:
      'Production streaming conversational agent for Mediacorp’s mewatch platform. Built the Linear EPG sub-agent in a LangGraph supervisor architecture, migrating schedule retrieval from BigQuery NL2SQL to Vertex AI Search and reducing latency by 45%.',
    image: '/project/mewatch.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'LangGraph', icon: <LangGraph key="langgraph" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
      { name: 'BigQuery', icon: <BigQuery key="bigquery" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
    ],
    details: true,
    projectDetailsPageSlug: '/projects/mewatch-conversational-agent',
    isWorking: true,
    isConfidential: true,
    badge: 'Production',
    badgeType: 'production',
  },
  {
    title: 'Multi-Agent Financial Guidance Platform (PoC)',
    description:
      'Hierarchical multi-agent RAG system built with Google ADK and Vertex AI. Owned the scheduled GOV.UK ingestion pipeline, two-stage vector retrieval tool with chunk expansion, and post-session PII redaction and media deletion routines.',
    image: '/project/Rag.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Google ADK', icon: <GoogleADK key="adk" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'BigQuery', icon: <BigQuery key="bigquery" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
    ],
    details: true,
    projectDetailsPageSlug: '/projects/multi-agent-rag',
    isWorking: true,
    isConfidential: true,
    badge: 'Enterprise PoC',
    badgeType: 'poc',
  },
  {
    title: 'Gong → Salesforce Agentic ETL Pipeline (PoC)',
    description:
      'Serverless ETL pipeline automating ingestion of Gong sales call transcripts into Salesforce Opportunities using GCP Cloud Functions, Google ADK SequentialAgent, and Gemini 2.0 Flash for MEDDPICC qualification with OAuth 2.0 JWT RS256 auth.',
    image: '/project/Gong.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Google ADK', icon: <GoogleADK key="adk" /> },
      { name: 'Cloud Functions', icon: <CloudFunctions key="gcp" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
    ],
    details: true,
    projectDetailsPageSlug: '/projects/gong-salesforce-etl',
    isWorking: true,
    isConfidential: true,
    badge: 'Enterprise PoC',
    badgeType: 'poc',
  },
  {
    title: 'Dual RAG Chatbots over Documentation & Source Code (PoC)',
    description:
      'Production-grade RAG chatbot services answering technical queries over versioned automotive middleware documentation and C++/Python source code using Vertex AI Matching Engine with version restrict namespaces and a 2-tier cost model cascade.',
    image: '/project/Chatbot.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
      { name: 'Cloud Functions', icon: <CloudFunctions key="CloudFunctions" /> },
      { name: 'GCP', icon: <GCP key="firestore" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
    ],
    details: true,
    projectDetailsPageSlug: '/projects/rag-chatbot-apex',
    isWorking: true,
    isConfidential: true,
    badge: 'Enterprise PoC',
    badgeType: 'poc',
  },
  {
    title: 'Figma-to-React Native Code Generator',
    description:
      'End-to-end AI design-to-code pipeline using Python, Figma REST API, and Gemini 2.5 Pro to convert Figma designs into production-ready React Native (TypeScript/TSX) components with schema-as-source-of-truth extraction.',
    image: '/project/figma2react.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Gemini 2.5 Pro', icon: <Gemini key="gemini" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
    ],
    details: true,
    projectDetailsPageSlug: '/projects/figma-to-react-native',
    isWorking: true,
    isConfidential: true,
    badge: 'Internal Tool',
    badgeType: 'internal',
  },
  {
    title: 'Snowflake Chatbot Solution',
    description:
      'Snowflake-focused chatbot combining PDF knowledge base in Pinecone vector database with Google Gemini API for similarity query resolution, deployed as an interactive Streamlit application.',
    image: '/project/Snowflake.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Gemini API', icon: <Gemini key="gemini" /> },
      { name: 'Pinecone', icon: <Pinecone key="pinecone" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    details: true,
    projectDetailsPageSlug: '/projects/snowflake-chatbot',
    isWorking: true,
  },
  {
    title: 'Audio Emotion Recognition',
    description:
      'Audio emotion classification model using MFCC acoustic features with SMOTE class balancing and sequence padding, fed into a CNN architecture achieving 61% test accuracy with a Streamlit UI.',
    image: '/project/Audio.png',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'TensorFlow', icon: <MachineLearning key="tensorflow" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    details: true,
    projectDetailsPageSlug: '/projects/audio-emotion-recognition',
    isWorking: true,
  },
  {
    title: 'Netflix Data Analysis Project: SQL Insights',
    description:
      'Comprehensive data analysis of Netflix global catalog using parameterized SQL queries to extract insights across content distribution, release cadence, rating classifications, and international production trends.',
    image: '/project/Netflix.png',
    technologies: [
      { name: 'SQL', icon: <PostgreSQL key="sql" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    details: true,
    projectDetailsPageSlug: '/projects/netflix-sql-insights',
    isWorking: true,
  },
];
