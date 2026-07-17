// api/config.js
// Endpoint público para que el frontend obtenga las credenciales de cliente de Supabase

export default function handler(req, res) {
  // Asegurar codificación UTF-8 en las respuestas
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usá GET.' });
  }

  // Devolver las credenciales públicas de Supabase
  return res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || null,
    supabaseKey: process.env.SUPABASE_KEY || null,
  });
}
