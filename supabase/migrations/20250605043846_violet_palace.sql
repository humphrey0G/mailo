/*
  # Email Settings Schema

  1. New Tables
    - `email_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `provider` (text)
      - `email` (text)
      - `settings` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `email_settings` table
    - Add policies for authenticated users to manage their own settings
*/

CREATE TABLE IF NOT EXISTS email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  provider text NOT NULL,
  email text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own email settings"
  ON email_settings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX email_settings_user_id_idx ON email_settings(user_id);