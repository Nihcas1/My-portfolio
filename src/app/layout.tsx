import '@/lib/storage-shim';
import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import ClientWidgets from '@/components/common/ClientWidgets';
import Footer from '@/components/common/Footer';
import JsonLd from '@/components/common/JsonLd';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';

import './globals.css';

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-hanken-grotesk antialiased`}>
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Quote />
          <Footer />
          <ClientWidgets />
          <UmamiAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
