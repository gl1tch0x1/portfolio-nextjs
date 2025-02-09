/*
  # Portfolio CMS Schema

  1. New Tables
    - `users`
      - Admin user table for CMS access
    - `projects`
      - Portfolio projects
    - `blog_posts`
      - Security blog posts
    - `experiences`
      - Work experience entries
    - `certifications`
      - Professional certifications
    - `skills`
      - Technical skills and proficiencies
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin read access"
  ON users
  FOR SELECT
  TO authenticated
  USING (is_admin = true);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  tags text[] DEFAULT '{}',
  github_url text,
  demo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin full access for projects"
  ON projects
  USING (auth.role() = 'authenticated');

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin full access for blog posts"
  ON blog_posts
  USING (auth.role() = 'authenticated');

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text NOT NULL,
  achievements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for experiences"
  ON experiences
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin full access for experiences"
  ON experiences
  USING (auth.role() = 'authenticated');

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  date text NOT NULL,
  description text NOT NULL,
  skills text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for certifications"
  ON certifications
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin full access for certifications"
  ON certifications
  USING (auth.role() = 'authenticated');

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  level integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for skills"
  ON skills
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admin full access for skills"
  ON skills
  USING (auth.role() = 'authenticated');

-- Insert default admin user
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin') THEN
    INSERT INTO users (email, password, is_admin)
    VALUES ('admin', 'Mr0x1f', true);
  END IF;
END $$;