import 'dotenv/config'
import sql from './lib/db.js'

async function test() {
  try {
    const result = await sql`SELECT 1 as test`
    console.log('Database connection successful:', result)
    
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('Existing tables:', tables.map(t => t.table_name))
    
    // Check specific tables from schema
    const expectedTables = ['profiles', 'health_conditions', 'questionnaires', 'questionnaire_responses', 'doctor_applications', 'approvals', 'chat_messages', 'appointments']
    const existingTables = tables.map(t => t.table_name)
    const missingTables = expectedTables.filter(t => !existingTables.includes(t))
    
    if (missingTables.length === 0) {
      console.log('All expected tables are present. Database is fully set up.')
    } else {
      console.log('Missing tables:', missingTables)
      console.log('You need to apply the schema from supabase-schema.sql to the database.')
    }
  } catch (err) {
    console.error('Database connection or query error:', err.message)
  } finally {
    await sql.end()
  }
}

test()
