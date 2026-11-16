'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

const trainingData = [
  {
    epoch: 'Weights Init',
    loss: 2.8,
    accuracy: 45,
    role: 'Student / Foundations',
    company: 'Early Days',
    date: 'Pre-2024',
    details: [
      'Mastered statistical foundations & ML mathematics (M.Sc / B.Sc)',
      'Built core neural network & predictive models',
    ],
  },
  {
    epoch: 'Epoch 1',
    loss: 1.5,
    accuracy: 72,
    role: 'ML Intern',
    company: 'Cloudside Technologies',
    date: 'Nov 2024',
    details: [
      'Built Figma-to-React Native code pipeline with Gemini 2.5 Pro',
      'Deployed Vertex AI RAG chatbot API with Matching Engine',
    ],
  },
  {
    epoch: 'Epoch 2',
    loss: 0.6,
    accuracy: 89,
    role: 'ML Engineer',
    company: 'Cloudside Technologies',
    date: 'Jan 2025',
    details: [
      'Architected hierarchical Multi-Agent RAG with Google ADK',
      'Built serverless ETL pipeline integrating GCP & Salesforce',
    ],
  },
  {
    epoch: 'Fine-Tuning',
    loss: 0.22,
    accuracy: 94,
    role: 'AI Engineer',
    company: 'Searce Cosourcing Services',
    date: 'Apr 2026',
    details: [
      'Built LangGraph Conversational AI streaming assistant across 121 channels',
      'Cut query latency 45% via Vertex AI Search; certified GCP PMLE & CCAF',
      'Early stopping & L2 regularization applied — optimal test generalization without overfitting',
    ],
  },
];

interface TooltipProps {
  active?: boolean;
  payload?: { payload: (typeof trainingData)[0] }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover text-popover-foreground border border-border p-4 rounded-xl shadow-xl max-w-sm backdrop-blur-md z-50">
        <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-3">
          <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
            {data.date}
          </p>
          <div className="flex gap-3">
            <span className="text-emerald-500 font-mono text-[11px] font-semibold">
              Acc: {data.accuracy}%
            </span>
            <span className="text-sky-500 font-mono text-[11px] font-semibold">
              Loss: {data.loss.toFixed(2)}
            </span>
          </div>
        </div>
        <h3 className="font-bold text-base leading-tight text-foreground">
          {data.role}
        </h3>
        <p className="text-primary text-xs mb-3 font-medium">
          @ {data.company}
        </p>
        <ul className="text-xs text-muted-foreground space-y-1.5 font-mono">
          {data.details.map((d: string, i: number) => (
            <li key={i} className="flex gap-2 items-start leading-snug">
              <span className="text-primary font-bold mt-0.5">{'>'}</span>
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
  const [metric, setMetric] = useState<'loss' | 'accuracy'>('loss');

  return (
    <Container className="mt-24 mb-12">
      <SectionHeading subHeading="Journey" heading="Training Log" />
      <p className="text-sm text-center text-muted-foreground max-w-xl mx-auto -mt-2 mb-8">
        Tracking professional growth, parameter optimization, and domain mastery across career epochs.
      </p>

      {/* Metric Selector Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
          <button
            onClick={() => setMetric('loss')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              metric === 'loss'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📉 Training Loss (Minimization)
          </button>
          <button
            onClick={() => setMetric('accuracy')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              metric === 'accuracy'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📈 Model Accuracy (% Gain)
          </button>
        </div>
      </div>

      <div className="w-full h-[380px] sm:h-[420px] bg-card/60 border border-border rounded-2xl p-4 sm:p-8 relative group overflow-hidden shadow-xs">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] text-foreground/[0.02] bg-[size:32px_32px] pointer-events-none" />

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trainingData}
            margin={{ top: 20, right: 30, left: -10, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-border/50"
              vertical={false}
            />
            <XAxis
              dataKey="epoch"
              stroke="currentColor"
              className="text-muted-foreground text-xs"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'currentColor', opacity: 0.2 }}
              tickMargin={12}
            />
            <YAxis
              stroke="currentColor"
              className="text-muted-foreground text-xs"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={metric === 'loss' ? [0, 3] : [40, 100]}
              tickFormatter={(val) =>
                metric === 'loss' ? val.toFixed(1) : `${val}%`
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.3 }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey={metric}
              name={metric === 'loss' ? 'Training Loss' : 'Model Accuracy'}
              stroke={metric === 'loss' ? '#0284c7' : '#10b981'}
              strokeWidth={3}
              dot={{ r: 5, fill: 'currentColor', stroke: metric === 'loss' ? '#0284c7' : '#10b981', strokeWidth: 2 }}
              activeDot={{
                r: 8,
                fill: '#ffffff',
                stroke: metric === 'loss' ? '#0284c7' : '#10b981',
                strokeWidth: 3,
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Info Badges */}
        <div className="absolute bottom-4 left-6 z-10 pointer-events-none flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border border-border bg-background/80 text-muted-foreground backdrop-blur-xs">
            <span
              className={`size-2 rounded-full ${
                metric === 'loss' ? 'bg-sky-500' : 'bg-emerald-500'
              }`}
            />
            {metric === 'loss'
              ? 'Loss: 2.80 → 0.22'
              : 'Accuracy: 45% → 94% (Optimal Generalization)'}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-muted-foreground font-mono">
            Hover points for epoch breakdown
          </span>
        </div>
      </div>
    </Container>
  );
}
