import About from '@/components/landing/About';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import ModelEvolution from '@/components/landing/ModelEvolution';
import Work from '@/components/landing/Projects';
import React from 'react';

export default function page() {
  return (
    <main className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Work />
      <ModelEvolution />
      <About />
      <Github />
    </main>
  );
}
