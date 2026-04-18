import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://mylwztzuuxhpqrfyowtd.supabase.co
const supabaseAnonKey = process.env.mylwztzuuxhpqrfyowtd

export const supabase = createClient(supabaseUrl, supabaseAnonKey)