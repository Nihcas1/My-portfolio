import { siteConfig } from '@/config/Meta';
import React from 'react';

export default function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: 'AI Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Searce Cosourcing Services Pvt Ltd',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Cloud Certified Professional Machine Learning Engineer (PMLE)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google Cloud',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Claude Code Architect Foundation (CCAF)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Anthropic',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Cloud Certified Associate Cloud Engineer (ACE)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google Cloud',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Certified Cloud Practitioner (CLF-C02)',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Amazon Web Services',
        },
      },
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Bharathiar University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Government Arts College, Coimbatore',
      },
    ],
    url: siteConfig.url,
    sameAs: [
      `https://github.com/${siteConfig.author.github}`,
      `https://www.linkedin.com/in/${siteConfig.author.linkedin}`,
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Agentic AI',
      'LangGraph',
      'Google ADK',
      'Multi-Agent Systems',
      'Retrieval-Augmented Generation (RAG)',
      'Google Cloud Platform',
      'Vertex AI',
      'Vertex AI Search',
      'Gemini 2.5 & 2.0 Flash',
      'DeepEval',
      'FastAPI',
      'Machine Learning',
      'Vector Search',
    ],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: personSchema,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profilePageSchema).replace(/</g, '\\u003c'),
      }}
    />
  );
}

