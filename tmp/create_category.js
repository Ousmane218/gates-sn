import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function createCategory() {
    const { data, error } = await supabase
        .from('categories')
        .insert([{ name: 'Nos Lunettes', slug: 'lunettes' }])
        .select()
    
    if (error) {
        console.error('Error creating category:', error)
    } else {
        console.log('Category created:', data)
    }
}

createCategory()
