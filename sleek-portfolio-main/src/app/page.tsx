import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Projects';
import VectorGalaxy from '@/components/landing/VectorGalaxy';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Work />
      <About />
      <Github />
      
      {/* 3D Holographic Map is the final landing section replacing blogs/cta/journey */}
      <VectorGalaxy />
    </Container>
  );
}
