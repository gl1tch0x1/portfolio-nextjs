import { Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export const metadata = {
  title: 'Security Researcher Portfolio',
  description: 'Portfolio and Blog of a Cybersecurity Expert',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.variable} font-mono`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}