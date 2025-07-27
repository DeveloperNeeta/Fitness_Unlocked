/*
  # Create families table for multi-generational fitness tracking

  1. New Tables
    - `families`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `families` table
    - Add policies for family members to read family data
    - Add policy for family creator to manage family
*/

-- Create families table
CREATE TABLE IF NOT EXISTS families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE families ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Family members can read family data"
  ON families
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT family_id 
      FROM user_profiles 
      WHERE user_id = auth.uid() AND family_id IS NOT NULL
    )
  );

CREATE POLICY "Users can create families"
  ON families
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Family creators can update their families"
  ON families
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS families_created_by_idx ON families(created_by);