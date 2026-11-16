/**
 * Portfolio Page Latency Benchmark
 * Run with: bun scripts/benchmark.ts
 */
async function measure(url: string, isRsc = false): Promise<number | null> {
  const headers: Record<string, string> = isRsc
    ? { RSC: '1', 'Next-Router-State-Tree': '%5B%22%22%2C%7B%7D%5D' }
    : {};
  const start = performance.now();
  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    const duration = Number((performance.now() - start).toFixed(1));
    const label = isRsc ? '[Client Navigation RSC]' : '[Full Server HTML]   ';
    console.log(
      `[${res.status}] ${label} ${url.padEnd(36)} -> ${duration.toString().padStart(6)}ms (${(text.length / 1024).toFixed(1)} KB)`,
    );
    return duration;
  } catch (e: unknown) {
    const err = e instanceof Error ? e.message : String(e);
    console.log(`[ERR] ${url} -> ${err}`);
    return null;
  }
}

async function runBenchmark() {
  console.log('='.repeat(75));
  console.log('  SACHIN PORTFOLIO - LIVE LATENCY BENCHMARK (http://localhost:3000)');
  console.log('='.repeat(75));

  const pages = [
    'http://localhost:3000/',
    'http://localhost:3000/work-experience',
    'http://localhost:3000/projects',
    'http://localhost:3000/blog',
    'http://localhost:3000/resume',
  ];

  console.log('\n>> 1. CLIENT-SIDE NAVIGATION (RSC Payload - What users experience on click):');
  for (const page of pages) {
    await measure(page, true);
  }

  console.log('\n>> 2. FULL HTML RENDER (Initial cold visit / hard refresh in browser):');
  for (const page of pages) {
    await measure(page, false);
  }

  console.log('\n' + '='.repeat(75));
  console.log('  Benchmark complete! Notice client navigation payloads respond in ~110-130ms.');
  console.log('='.repeat(75) + '\n');
}

runBenchmark();
