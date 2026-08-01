// api/config.js
// Endpoint público para que el frontend obtenga las credenciales de cliente de Supabase

export default function handler(req, res) {
  // Asegurar codificación UTF-8 en las respuestas
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usá GET.' });
  }

  // La SUPABASE_URL viene de la env var
  // La SUPABASE_ANON_KEY es la clave pública (anon) — diferente al service_role key del backend
  return res.status(200).json({
    supabaseUrl: (process.env.SUPABASE_URL || '').trim(),
    supabaseKey: (process.env.SUPABASE_ANON_KEY || '').trim(),
  });
}
