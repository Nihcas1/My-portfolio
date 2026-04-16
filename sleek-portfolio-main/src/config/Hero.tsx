/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" }, // Note: You'd need to create Python component
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the href values to your own social media profiles
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import AWS from '@/components/technologies/AWS';
import Python from '@/components/technologies/Python';
import NodeJs from '@/components/technologies/NodeJs';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import LangChain from '@/components/technologies/LangChain';

// Technology Components
import TypeScript from '@/components/technologies/TypeScript';
import FastAPI from '@/components/technologies/FastAPI'
import VertexAI from '@/components/technologies/VertexAI'
import GoogleADK from '@/components/technologies/GoogleADK'
import Gemini from '@/components/technologies/Gemini'


// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NodeJs: NodeJs,
  AWS: AWS,
  Postman: Postman,
  Python: Python,
  LangChain: LangChain,
  FastAPI: FastAPI,
  VertexAI: VertexAI,
  GoogleADK: GoogleADK,
  Gemini: Gemini
};

export const heroConfig = {
  // Personal Information
  name: 'Sachin',
  title: 'An AI / ML Engineer.',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Python',
      href: 'https://www.python.org/',
      component: 'Python',
    },
    {
      name: 'Vertex AI',
      href: 'https://cloud.google.com/vertex-ai',
      component: 'VertexAI',
    },
    {
      name: 'Gemini',
      href: 'https://deepmind.google/technologies/gemini/',
      component: 'Gemini',
    },
    {
      name: 'FastAPI',
      href: 'https://fastapi.tiangolo.com/',
      component: 'FastAPI',
    },
    {
      name: 'Google ADK',
      href: 'https://google.github.io/adk-docs/',
      component: 'GoogleADK',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I architect and deploy production-grade AI systems, leveraging {skills:0}, {skills:1}, and {skills:2}. Specialized in building scalable <b>RAG pipelines</b>, <b>multi-agent orchestration</b> with {skills:4}, and high-performance serverless backends using {skills:3} Passionate about transforming complex unstructured data into actionable intelligence.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/k-sachin01/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Nihcas1/',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:asachin2318@gmail.com',
    icon: <Mail />,
  },
];
