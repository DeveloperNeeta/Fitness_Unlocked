/*
  # Create user profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `age` (integer)
      - `height` (integer, in cm)
      - `weight` (integer, in kg)
      - `cultural_background` (text)
      - `fitness_level` (enum: beginner, intermediate, advanced)
      - `ayurvedic_type` (enum: vata, pitta, kapha)
      - `goals` (text array)
      - `family_id` (uuid, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for users to read/write their own profile data
*/

-- Create enum types
CREATE TYPE fitness_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE ayurvedic_type AS ENUM ('vata', 'pitta', 'kapha');

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  age integer NOT NULL CHECK (age >= 13 AND age <= 120),
  height integer NOT NULL CHECK (height >= 100 AND height <= 250),
  weight integer NOT NULL CHECK (weight >= 30 AND weight <= 300),
  cultural_background text NOT NULL,
  fitness_level fitness_level NOT NULL DEFAULT 'beginner',
  ayurvedic_type ayurvedic_type NOT NULL DEFAULT 'kapha',
  goals text[] DEFAULT '{}',
  family_id uuid DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS user_profiles_user_id_idx ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS user_profiles_family_id_idx ON user_profiles(family_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();