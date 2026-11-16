# Sachin K — AI/ML Engineer Portfolio

[![Next.js 15](https://img.shields.io/badge/Next.js-15.3.8-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat&logo=three.js)](https://threejs.org/)
[![Bun](https://img.shields.io/badge/Runtime-Bun%20v1.4+-fbf0df?style=flat&logo=bun)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-performance, dark-mode-first personal engineering portfolio designed for an **AI/ML Engineer specializing in Agentic Workflows, Enterprise RAG Pipelines, and Multi-Agent Orchestration**. Built with Next.js 15 (App Router), React 19, TypeScript, Three.js WebGL, and Tailwind CSS.

---

## 🌟 Key Features & Architecture

### 1. 3D Neural Core Hologram (Arc Reactor HUD v2.5)
- **Interactive Three.js WebGL Visualization**: Geodesic icosahedron lattice, dynamic orbital counter-rotating rings, and ambient particle field with full 360° rotation and zoom.
- **Live Engineering Telemetry**: Live architecture breakdown displaying LLM Inference (*Gemini 2.5 Flash Lite*), Orchestration (*LangGraph & Google ADK*), Vector Search (*Vertex AI Discovery Engine*), and Deployment (*GCP Serverless Gen 2*).
- **Recruiter Fast Actions**: 1-click modal actions to download resume PDF, launch AI candidate inquiries, copy contact cards, and explore project case studies.
- **Multi-Theme Chromatic Switching**: Instant runtime theme palette switching (Cyan, Emerald, Violet, Amber).

### 2. Conversational AI Assistant (`/api/chat`)
- **Real-Time Token Streaming**: Server-Sent Events (SSE) streaming powered by **Google Gemini 2.5 Flash Lite** with zero-latency thinking budget.
- **Sub-Millisecond Fast-Path Engine**: Instant local dispatch for high-frequency recruiter questions (experience at Searce, LangGraph expertise, verified certifications, direct contact).
- **Enterprise Guardrails & Jailbreak Defense**:
  - Rejects utility abuse (homework, LeetCode solvers, creative writing) with witty engineer persona.
  - Neutralizes prompt injection attempts (`ignore previous instructions`, `DAN`, `system prompt override`) via multi-pattern sanitization.
  - First-person real-human speech persona (*"I", "my", "me"*) without robotic boilerplate.
  - Automatically surfaces 1-click contact chips (`✉️ Email`, `🔗 LinkedIn`, `💬 WhatsApp`, `📝 Contact Form`).

### 3. Native GitHub Activity Contribution Calendar
- **In-Portfolio Rendering**: Embeds `react-activity-calendar` directly into the portfolio layout without external redirects or broken third-party badges.
- **Robust API Route (`/api/github-contributions`)**: Caches and normalizes GitHub contribution activity with seamless fallback for private corporate profiles.

### 4. Calibrated Model Training Evolution Graph
- **Interactive Epoch Performance Visualizer**: Displays a realistic loss convergence curve ($2.80 \to 0.22$) and training vs. test accuracy curve ($42\% \to 94\%$).
- **Generalization Integrity**: Calibrated to 94% test accuracy with early stopping and L2 regularization notes to reflect real-world ML generalization without synthetic overfitting.

### 5. Multi-Channel Recruiter Fast Dispatch
- **Direct Free WhatsApp Click-to-Chat**: One-tap pre-filled messaging via `wa.me/919597315323`.
- **Direct LinkedIn Messaging**: Pre-configured direct connect to `linkedin.com/in/k-sachin01`.
- **Integrated Contact Form**: Direct Telegram bot notification dispatch with chat ID verification.

### 6. Enterprise Privacy & Project Case Studies
- **Clear Production vs. PoC Tiering**:
  - `Production`: *mewatch Conversational Agent (Linear EPG Sub-Agent)* for Mediacorp with pulsing green status indicator.
  - `Enterprise PoC`: *Multi-Agent Financial Guidance Platform (AILA Money)*, *Gong → Salesforce ETL Pipeline*, and *Apex.AI Dual RAG Chatbots*.
  - `Internal Tool`: *Figma-to-React Native Code Generation Engine*.
  - `Open Source`: *Snowflake Chatbot Solution*, *Audio Emotion Recognition*, and *Netflix SQL Insights* with direct GitHub links.
- **Strict Privacy Compliance**: Zero private client or employer repositories exposed.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.8](https://nextjs.org/) (App Router, Server Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI primitives, Lucide Icons, Phosphor Icons
- **3D Graphics**: [Three.js](https://threejs.org/) (WebGL Canvas)
- **AI / LLM**: [Google Gemini API](https://deepmind.google/technologies/gemini/) (SSE token streaming)
- **Markdown / Content**: MDX with `gray-matter` & `@next/mdx`
- **Charts / Dataviz**: Recharts & `react-activity-calendar`
- **Package Manager / Runtime**: [Bun](https://bun.sh/)

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (v1.1 or higher recommended) or [Node.js](https://nodejs.org/) (v18+)
- A Google AI Studio API key (free at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nihcas1/My-portfolio.git
   cd My-portfolio
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your API keys:
   ```env
   NEXT_PUBLIC_URL="http://localhost:3000"
   GEMINI_API_KEY="your-gemini-api-key"
   TELEGRAM_BOT_TOKEN="optional-telegram-bot-token"
   TELEGRAM_CHAT_ID="optional-telegram-chat-id"
   ```

4. **Start the local development server**:
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🧪 Automated Verification Test Suite

The project includes an end-to-end automated verification script covering **32 concrete feature assertions**:

```bash
bun scripts/verify-all.ts
```

### What the test suite verifies:
- **Suite 1: Project Catalog & Badges**: 8 total projects, mewatch verified as `Production`, PoCs verified as `Enterprise PoC`, zero private employer repo leaks, only personal GitHub repos exposed.
- **Suite 2: MDX Case Studies**: All 8 case study files parse valid frontmatter, technologies, challenges, learnings, and content > 200 characters.
- **Suite 3: Navigation & Contact**: Global navbar excludes `/blog` (redirects to `/projects`), WhatsApp and LinkedIn links valid, `Sachin_K_Resume.pdf` verified on disk (>100 KB).
- **Suite 4: Model Evolution & Arc Reactor**: 94% generalization accuracy verified, duplicate `X` close button eliminated (`showCloseButton={false}`), responsive 1152px+ modal container.
- **Suite 5: API Route Handlers**: `/api/github-contributions` returns HTTP 200 with 365-day array and exact 13 contributions.
- **Suite 6: Chat Assistant Security**: `GET /api/chat` returns 405, invalid payload returns 400 with Zod errors, prompt injection patterns sanitized with `[REDACTED]`, fast-path responses active.
- **Suite 7: Certifications & Experience**: Verified 4 certifications (GCP PMLE, Claude CCAF, GCP ACE, AWS CLF) and work experience at Searce & Cloudside.

---

## 📁 Project Structure

```text
├── public/                     # Static assets, resume PDF, certificate badges
├── scripts/
│   ├── verify-all.ts          # Comprehensive 32-point automated verification suite
│   └── benchmark.ts           # Route response latency & cold-start benchmarks
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/
│   │   │   ├── chat/          # Gemini SSE streaming & prompt guardrails
│   │   │   ├── contact/       # Contact form & Telegram dispatch
│   │   │   └── github-contributions/ # GitHub calendar proxy & caching
│   │   ├── blog/              # Clean server-side redirect to /projects
│   │   ├── contact/           # 1-click dispatch (LinkedIn, WhatsApp, Email)
│   │   ├── projects/          # Projects catalog & [slug] dynamic MDX case studies
│   │   ├── resume/            # Interactive resume & PDF preview
│   │   ├── work-experience/   # Career timeline & accomplishments
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── common/            # ChatBubble, Navbar, Footer, MobileNav
│   │   ├── hologram/          # NeuralCoreHologram (Three.js Arc Reactor HUD)
│   │   ├── landing/           # Hero, ModelEvolution, Github, ProjectsPreview
│   │   ├── projects/          # ProjectCard, ProjectDetails, Badge components
│   │   └── ui/                # Accessible Radix UI design primitives
│   ├── config/                # Centralized configuration (Hero, Projects, Experience, Chat)
│   ├── data/projects/         # Rich MDX case studies for all 8 engineering projects
│   └── lib/                   # Utility helpers, MDX parsers, storage shims
├── next.config.ts             # Next.js optimization configuration
└── tsconfig.json              # TypeScript strict configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Sachin K**
- **Role**: AI/ML Engineer (Agentic AI, Enterprise RAG, Generative Systems)
- **Location**: Coimbatore, Tamil Nadu, India
- **LinkedIn**: [linkedin.com/in/k-sachin01](https://www.linkedin.com/in/k-sachin01/)
- **GitHub**: [github.com/Nihcas1](https://github.com/Nihcas1)
- **WhatsApp**: [+91 9597315323](https://wa.me/919597315323)
