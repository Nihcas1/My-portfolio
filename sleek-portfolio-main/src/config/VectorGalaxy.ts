export interface SkillNode {
  id: string;
  name: string;
  category: string;
  description: string;
  position: [number, number, number]; // x, y, z
  color: string;
  connections: string[]; // IDs of nodes this node connects to
}

// Map the 8 clusters to perfectly maximally distant points (the 8 vertices of a cube inscribed in the sphere).
// This guarantees that the *groups* of clusters are as far away from each other as physically possible.
const categoryCenters: Record<string, { phi: number, theta: number }> = {
  // Upper Hemisphere (Phi ~55 degrees / 0.95 rad)
  'Agentic Frameworks': { phi: 0.95, theta: Math.PI / 4 },         // Front-Right
  'GCP Services':       { phi: 0.95, theta: 3 * Math.PI / 4 },     // Back-Right
  'LLM Models':         { phi: 0.95, theta: 5 * Math.PI / 4 },     // Back-Left
  'Vector DBs':         { phi: 0.95, theta: 7 * Math.PI / 4 },     // Front-Left

  // Lower Hemisphere (Phi ~125 degrees / 2.18 rad)
  'Backend':            { phi: 2.18, theta: Math.PI / 4 },         // Front-Right
  'Frontend':           { phi: 2.18, theta: 3 * Math.PI / 4 },     // Back-Right
  'ML / Data Science':  { phi: 2.18, theta: 5 * Math.PI / 4 },     // Back-Left
  'DevOps / Infra':     { phi: 2.18, theta: 7 * Math.PI / 4 },     // Front-Left
};

function getClusteredSpherePosition(category: string, index: number, radius = 3.45): [number, number, number] {
  const base = categoryCenters[category] || { phi: Math.PI / 2, theta: 0 };
  
  // Clean pseudo-random function returning between 0.0 and 1.0
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // We keep datapoints VERY CLOSE together within their own cluster (max +/- 0.15 rads)
  // This causes them to tightly group into dense hubs on their highly separated continents.
  const offsetPhi = (pseudoRandom(index * 12.9898) - 0.5) * 0.3; 
  const offsetTheta = (pseudoRandom(index * 78.233) - 0.5) * 0.3;

  // Clamp phi strictly between poles to avoid distortion
  const phi = Math.max(0.1, Math.min(Math.PI - 0.1, base.phi + offsetPhi));
  const theta = base.theta + offsetTheta;
  
  // Standard spherical to cartesian conversion
  const y = radius * Math.cos(phi);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
}

const colors = {
  agents: '#00E676', // Bright Green
  gcp: '#4285F4',    // Google Blue
  llm: '#8E24AA',    // Purple
  db: '#F48FB1',     // Pink
  backend: '#00BFA5',// Teal
  frontend: '#61DAFB',// React blue
  ml: '#FF9800',     // Orange
  devops: '#EF5350'  // Red
};

const rawData = [
  // -----------------------------------------
  // Agentic Frameworks (Cluster 1)
  // -----------------------------------------
  { id: 'a1', name: 'LangChain', category: 'Agentic Frameworks', description: 'LLM App Framework', color: colors.agents, connections: ['a2', 'a3', 'l1', 'l2', 'v1', 'b1'] },
  { id: 'a2', name: 'LangGraph', category: 'Agentic Frameworks', description: 'Stateful multi-actor agents', color: colors.agents, connections: ['a1', 'a3', 'l2'] },
  { id: 'a3', name: 'Google ADK', category: 'Agentic Frameworks', description: 'Agentic Development Kit', color: colors.agents, connections: ['a1', 'a2', 'l2', 'g3'] },
  { id: 'a4', name: 'CrewAI', category: 'Agentic Frameworks', description: 'Role-based agent swarms', color: colors.agents, connections: ['a1', 'l1'] },
  { id: 'a5', name: 'AutoGen', category: 'Agentic Frameworks', description: 'Multi-agent conversation', color: colors.agents, connections: ['a4', 'l1'] },
  
  // -----------------------------------------
  // GCP Services (Cluster 2)
  // -----------------------------------------
  { id: 'g1', name: 'Cloud Run', category: 'GCP Services', description: 'Serverless containers', color: colors.gcp, connections: ['g2', 'g3', 'b1', 'd1'] },
  { id: 'g2', name: 'Cloud Functions', category: 'GCP Services', description: 'Event-driven compute', color: colors.gcp, connections: ['g1', 'g4', 'b2'] },
  { id: 'g3', name: 'Vertex AI', category: 'GCP Services', description: 'ML Ops & Model endpoints', color: colors.gcp, connections: ['g1', 'l2', 'a3', 'm1', 'm2'] },
  { id: 'g4', name: 'BigQuery', category: 'GCP Services', description: 'Serverless data warehouse', color: colors.gcp, connections: ['g2', 'g3', 'm3'] },

  // -----------------------------------------
  // LLM Models (Cluster 3)
  // -----------------------------------------
  { id: 'l1', name: 'OpenAI', category: 'LLM Models', description: 'GPT-4 & Embeddings', color: colors.llm, connections: ['l2', 'l3'] },
  { id: 'l2', name: 'Gemini', category: 'LLM Models', description: 'Multimodal foundation models', color: colors.llm, connections: ['l1', 'l3', 'g3'] },
  { id: 'l3', name: 'Claude', category: 'LLM Models', description: 'Anthropic Opus & Sonnet', color: colors.llm, connections: ['l1', 'l2'] },
  { id: 'l4', name: 'Llama 3', category: 'LLM Models', description: 'Meta Open Source LLM', color: colors.llm, connections: ['l1'] },

  // -----------------------------------------
  // Vector DBs (Cluster 4)
  // -----------------------------------------
  { id: 'v1', name: 'Pinecone', category: 'Vector DBs', description: 'Serverless vector native db', color: colors.db, connections: ['v2', 'v3'] },
  { id: 'v2', name: 'ChromaDB', category: 'Vector DBs', description: 'AI-native open source vector db', color: colors.db, connections: ['v1', 'v3'] },
  { id: 'v3', name: 'Weaviate', category: 'Vector DBs', description: 'AI-first vector search engine', color: colors.db, connections: ['v1', 'v2'] },

  // -----------------------------------------
  // Backend (Cluster 5)
  // -----------------------------------------
  { id: 'b1', name: 'FastAPI', category: 'Backend', description: 'High performance Python APIs', color: colors.backend, connections: ['b2', 'b3', 'f1'] },
  { id: 'b2', name: 'Python', category: 'Backend', description: 'Core ML & Scripting language', color: colors.backend, connections: ['b1', 'm3', 'm4'] },
  { id: 'b3', name: 'Node.js', category: 'Backend', description: 'Event-driven backend services', color: colors.backend, connections: ['b1', 'f1'] },
  { id: 'b4', name: 'Express', category: 'Backend', description: 'Web framework for Node.js', color: colors.backend, connections: ['b3', 'f2'] },

  // -----------------------------------------
  // Frontend (Cluster 6)
  // -----------------------------------------
  { id: 'f1', name: 'React', category: 'Frontend', description: 'Interactive UIs', color: colors.frontend, connections: ['f2', 'f3', 'f4'] },
  { id: 'f2', name: 'TypeScript', category: 'Frontend', description: 'Type-safe scalable JavaScript', color: colors.frontend, connections: ['f1', 'b3'] },
  { id: 'f3', name: 'Streamlit', category: 'Frontend', description: 'Fast data apps & ML dashboards', color: colors.frontend, connections: ['f1', 'b2'] },
  { id: 'f4', name: 'Next.js', category: 'Frontend', description: 'React framework for production', color: colors.frontend, connections: ['f1', 'f2'] },

  // -----------------------------------------
  // ML / Data Science (Cluster 7)
  // -----------------------------------------
  { id: 'm1', name: 'TensorFlow', category: 'ML / Data Science', description: 'End-to-end ML platform', color: colors.ml, connections: ['m2', 'm4', 'g3'] },
  { id: 'm2', name: 'PyTorch', category: 'ML / Data Science', description: 'Deep learning framework', color: colors.ml, connections: ['m1', 'm4'] },
  { id: 'm3', name: 'Pandas', category: 'ML / Data Science', description: 'Data analysis library', color: colors.ml, connections: ['m4', 'b2', 'g4'] },
  { id: 'm4', name: 'Scikit-Learn', category: 'ML / Data Science', description: 'Machine learning in Python', color: colors.ml, connections: ['m1', 'm2', 'm3'] },

  // -----------------------------------------
  // DevOps / Infra (Cluster 8)
  // -----------------------------------------
  { id: 'd1', name: 'Docker', category: 'DevOps / Infra', description: 'Containerization platform', color: colors.devops, connections: ['d2', 'd3', 'g1'] },
  { id: 'd2', name: 'Kubernetes', category: 'DevOps / Infra', description: 'Container orchestration', color: colors.devops, connections: ['d1', 'd4'] },
  { id: 'd3', name: 'GitHub Actions', category: 'DevOps / Infra', description: 'CI/CD Automation', color: colors.devops, connections: ['d1', 'd4'] },
  { id: 'd4', name: 'Terraform', category: 'DevOps / Infra', description: 'Infrastructure as code', color: colors.devops, connections: ['d2', 'g1'] },
];

export const vectorGalaxyData: SkillNode[] = rawData.map((data, index) => ({
  ...data,
  position: getClusteredSpherePosition(data.category, index)
}));
