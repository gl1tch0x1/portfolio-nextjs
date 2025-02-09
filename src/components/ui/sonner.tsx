// 'use client' directive ensures that this component runs on the client-side
'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Get the theme and fall back to 'system' if it's undefined
  const { theme } = useTheme();

  // Type guard to ensure theme is one of the valid types: 'system' | 'light' | 'dark'
  const validTheme: "system" | "light" | "dark" | undefined =
    theme === "light" || theme === "dark" || theme === "system" ? theme : undefined;

  return (
    <Sonner
      {...props}
      theme={validTheme}  // Pass the valid theme to Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
};

export { Toaster };
