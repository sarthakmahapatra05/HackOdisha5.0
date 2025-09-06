import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mnicqwxceoxwwuehzibw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaWNxd3hjZW94d3d1ZWh6aWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzcyOTAsImV4cCI6MjA3MjcxMzI5MH0.rObphOWjeznqFaGiGerOxM9DMYohuWyOGUSkgQp6uGs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  try {
    console.log('Testing Supabase connection...')
    const tables = ['profiles', 'health_conditions', 'questionnaires', 'questionnaire_responses', 'doctor_applications', 'approvals', 'chat_messages', 'appointments']
    let allExist = true
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*').limit(1)
      if (error) {
        console.log(`Table ${table} does not exist or error:`, error.message)
        allExist = false
      } else {
        console.log(`Table ${table} exists`)
      }
    }
    if (allExist) {
      console.log('All expected tables are present. Database is fully set up.')
    } else {
      console.log('Some tables are missing. You need to apply the schema from supabase-schema.sql to the Supabase database.')
    }
  } catch (err) {
    console.error('Error:', err.message)
  }
}

test()
