import { createClient } from '@supabase/supabase-js';

export default async function Page() {
  const supabaseUrl = process.env.SUPABASE_URL; // This should get the URL from .env.local
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Similarly for anon key

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required");
  }

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: todos, error } = await supabase.from('todos').select('*');

  if (error) {
    console.error("Error loading todos:", error);
    return <p>Error loading todos: {error.message}</p>;
  }

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
