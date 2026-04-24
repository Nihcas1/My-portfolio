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
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Multi-Agent RAG System',
    description:
      'Hierarchical multi-agent RAG system with Google ADK and Vertex AI, routing financial queries to specialized agents with semantic search over domain knowledge bases',
    image: '/project/Rag.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Google ADK', icon: <GoogleADK key="adk" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'BigQuery', icon: <BigQuery key="bigquery" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/multi-agent-rag',
    isWorking: true,
  },
  {
    title: 'Gong → Salesforce ETL Pipeline',
    description:
      'Serverless ETL pipeline automating ingestion of Gong sales call transcripts into Salesforce Opportunities using GCP Cloud Functions, Google ADK SequentialAgent, and Gemini 2.0 Flash for MEDDPICC-based CRM insights',
    image: '/project/Gong.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Google ADK', icon: <GoogleADK key="adk" /> },
      { name: 'Cloud Functions', icon: <CloudFunctions key="gcp" /> },
      { name: 'FastAPI', icon: <FastAPI key="fastapi" /> },
      { name: 'Gemini', icon: <Gemini key="gemini" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/gong-salesforce-etl',
    isWorking: true,
  },
  {
    title: 'Figma-to-React Native Code Generator',
    description:
      'End-to-end AI-powered design-to-code pipeline using Python, Figma API, and Gemini 2.5 Pro to convert Figma designs into production-ready React Native (TypeScript/TSX) components',
    image: '/project/figma2react.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Gemini 2.5 Pro', icon: <Gemini key="gemini" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/figma-to-react-native',
    isWorking: true,
  },
  {
    title: 'RAG Chatbot API',
    description:
      'Production-grade RAG-based chatbot API using FastAPI, Vertex AI (Gemini, Embeddings), and Matching Engine for low-latency semantic search, with stateful conversation handling via Firestore and LangChain',
    image: '/project/Chatbot.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Vertex AI', icon: <VertexAI key="vertexai" /> },
      { name: 'Cloud Functions', icon: <CloudFunctions key="CloudFunctions" /> },
      { name: 'GCP', icon: <GCP key="firestore" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/rag-chatbot-apex',
    isWorking: true,
  },
  {
    title: 'Snowflake Chatbot Solution',
    description:
      'Snowflake-focused chatbot combining PDF-based knowledge base stored in Pinecone vector database with Google Gemini API for accurate, similarity-based query resolution, deployed as a Streamlit application',
    image: '/project/Snowflake.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Gemini API', icon: <Gemini key="gemini" /> },
      { name: 'Pinecone', icon: <Pinecone key="pinecone" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/snowflake-chatbot',
    isWorking: true,
  },
  {
    title: 'Audio Emotion Recognition',
    description:
      'Audio emotion classification model using MFCC features with SMOTE and padding techniques, fed into a CNN architecture achieving 61% accuracy, with an interactive Streamlit UI',
    image: '/project/Audio.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'TensorFlow', icon: <MachineLearning key="tensorflow" /> },
      { name: 'Streamlit', icon: <Streamlit key="streamlit" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/audio-emotion-recognition',
    isWorking: true,
  },
  {
    title: 'Netflix Data Analysis Project: SQL Insights',
    description:
      'Conducted a comprehensive analysis of Netflix content using SQL to extract actionable insights on content type distribution, ratings, actors, directors, and geographical trends.',
    image: '/project/Netflix.png',
    link: 'https://github.com/Nihcas1/',
    technologies: [
      { name: 'SQL', icon: <PostgreSQL key="sql" /> },
    ],
    github: 'https://github.com/Nihcas1/',
    live: 'https://github.com/Nihcas1/',
    details: false,
    projectDetailsPageSlug: '/projects/netflix-sql-insights',
    isWorking: true,
  },
];
