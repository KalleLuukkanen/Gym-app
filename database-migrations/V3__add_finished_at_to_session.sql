ALTER TABLE workout_session
ADD COLUMN finished_at TIMESTAMPTZ;

ALTER TABLE workout_session
ADD COLUMN started_at TIMESTAMPTZ;