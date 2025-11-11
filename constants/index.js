import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jeuoqnijtbcqagfqddfh.supabase.co'
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldW9xbmlqdGJjcWFnZnFkZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mzk5OTQsImV4cCI6MjA3ODIxNTk5NH0.nTPmrLKKDsF5WuK9KflKGtcxGWJ1I_pUXqlM92dKvBY'


export const supabase = createClient(supabaseUrl, supabaseAnonKey);