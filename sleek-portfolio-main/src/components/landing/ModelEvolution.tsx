'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import SectionHeading from '../common/SectionHeading';
import Container from '../common/Container';

const trainingData = [
  {
    epoch: "Weights Init",
    loss: 2.8,
    accuracy: 45,
    role: "Student / Foundations",
    company: "Early Days",
    date: "Pre-2024",
    details: ["Learning underlying ML mathematics", "Building foundational neural networks"]
  },
  {
    epoch: "Epoch 1",
    loss: 1.5,
    accuracy: 72,
    role: "ML Intern",
    company: "Cloudside",
    date: "Nov 2024",
    details: ["Built Figma-to-React Native AI pipeline", "Deployed Vertex AI RAG chatbot API"]
  },
  {
    epoch: "Epoch 2",
    loss: 0.6,
    accuracy: 89,
    role: "ML Engineer",
    company: "Cloudside",
    date: "Jan 2025",
    details: ["Architected modular Multi-Agent RAG (ADK)", "Built serverless ETL logic integrating GCP & Salesforce"]
  },
  {
    epoch: "Fine-Tuning",
    loss: 0.15,
    accuracy: 99,
    role: "AI Engineer",
    company: "Searce",
    date: "April 2025",
    details: ["Spearheading advanced multi-agent initiatives", "Deploying scalable production AI pipelines"]
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#000510]/95 border border-cyan-500/40 p-4 rounded-xl shadow-[0_0_30px_rgba(0,180,255,0.15)] max-w-sm backdrop-blur-md z-50">
        <div className="flex justify-between items-center border-b border-cyan-900/50 pb-2 mb-3">
          <p className="text-cyan-400 font-mono text-[10px] tracking-wider uppercase">{data.date}</p>
          <div className="flex gap-3">
            <p className="text-[#00E676] font-mono text-[10px]">Acc: {data.accuracy}%</p>
            <p className="text-[#ff4444] font-mono text-[10px]">Loss: {data.loss.toFixed(2)}</p>
          </div>
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">{data.role}</h3>
        <p className="text-cyan-300 text-sm mb-4 font-medium">@ {data.company}</p>
        <ul className="text-xs text-gray-300 space-y-2 font-mono">
          {data.details.map((d: string, i: number) => (
            <li key={i} className="flex gap-2 items-start leading-snug">
              <span className="text-cyan-500 font-bold mt-0.5">{'>'}</span> 
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export default function ModelEvolution() {
  return (
    <Container className="mt-32 mb-10">
      <SectionHeading subHeading="Journey" heading="Training Log" />
      <p className="text-sm text-center text-cyan-200/50 mb-12">Tracking professional accuracy and skill parameter optimization across key career epochs.</p>
      
      <div className="w-full h-[400px] bg-black/40 border border-cyan-900/30 rounded-2xl p-4 sm:p-8 relative group overflow-hidden shadow-[inset_0_0_50px_rgba(0,50,255,0.05)]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,180,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trainingData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#004466" opacity={0.2} vertical={false} />
            <XAxis 
              dataKey="epoch" 
              stroke="#0088cc" 
              fontSize={12} 
              tick={{fill: '#0088cc'}} 
              tickLine={false}
              axisLine={{ stroke: '#004466', strokeWidth: 1 }}
              tickMargin={15}
            />
            {/* We chart the 'loss' on the Y-Axis to show it dropping over time */}
            <YAxis 
              stroke="#0088cc" 
              fontSize={12} 
              tick={{fill: '#0088cc'}} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => val.toFixed(1)}
              domain={[0, 4]} // Fixed domain so loss clearly drops to bottom
              hide={false}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#00ffff', strokeWidth: 1, strokeDasharray: '4 4' }} 
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey="loss" 
              name="Training Loss"
              stroke="#00ffff" 
              strokeWidth={3} 
              dot={{ r: 5, fill: '#000', stroke: '#00ffff', strokeWidth: 2 }} 
              activeDot={{ r: 8, fill: '#ffffff', stroke: '#00ffff', strokeWidth: 3 }}
              animationDuration={2500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Helper Badge */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none border border-cyan-500/20 bg-black/50 px-2 py-1 rounded text-[10px] text-cyan-400 font-mono">
          Metric: Loss Minimization
        </div>
      </div>
    </Container>
  );
}
