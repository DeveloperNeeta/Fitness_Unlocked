/*
  # Create user progress tracking table

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `date` (date)
      - `water_intake` (integer, glasses of water)
      - `daily_steps` (integer)
      - `workouts_completed` (integer)
      - `wellness_score` (integer, 0-100)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_progress` table
    - Add policy for users to read/write their own progress data
*/

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  water_intake integer DEFAULT 0 CHECK (water_intake >= 0),
  daily_steps integer DEFAULT 0 CHECK (daily_steps >= 0),
  workouts_completed integer DEFAULT 0 CHECK (workouts_completed >= 0),
  wellness_score integer DEFAULT 0 CHECK (wellness_score >= 0 AND wellness_score <= 100),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create unique constraint to prevent duplicate entries per user per day
CREATE UNIQUE INDEX IF NOT EXISTS user_progress_user_date_idx ON user_progress(user_id, date);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS user_progress_date_idx ON user_progress(date);