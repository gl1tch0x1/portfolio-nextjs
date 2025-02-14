'use client'; // Add this directive to make the component a client component

import { useState, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import { toast } from 'sonner';

interface AppState {}

export const AppStateContext = createContext<AppState>({});
export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppStateContext.Provider value={{}}>
      {children}
    </AppStateContext.Provider>
  );
};

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient(); // Create the Supabase client instance

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent the default form submission behavior
    setLoading(true);    // Set loading to true to disable the button during authentication

    const formData = new FormData(e.currentTarget);  // Extract form data
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error; // Handle any errors

      // Redirect to the admin page and refresh the router
      router.push('/admin');
      router.refresh(); 
    } catch (error) {
      toast.error('Invalid credentials'); // Show error toast message
    } finally {
      setLoading(false);  // Set loading to false after authentication attempt
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </div>
        <CardDescription>
          Enter your credentials to access the admin panel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              name="email"
              placeholder="Username"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Authenticating...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
