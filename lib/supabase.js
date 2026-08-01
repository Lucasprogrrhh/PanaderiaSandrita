// lib/supabase.js
// Cliente de Supabase reutilizable para todas las funciones serverless

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.SUPABASE_URL || '').trim();
const supabaseKey = (process.env.SUPABASE_KEY || '').trim();

// Verificar que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de entorno: SUPABASE_URL y SUPABASE_KEY son requeridas.');
}

// Exportar cliente singleton
export const supabase = createClient(supabaseUrl, supabaseKey);
