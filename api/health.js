// api/health.js
// Health check básico para verificar que la API está en línea

/**
 * GET /api/health
 * Verifica que el servidor de Vercel Functions esté operativo
 */
export default function handler(req, res) {
  // Solo aceptar GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Usá GET.' });
  }

  return res.status(200).json({
    status: 'ok',
    servicio: 'API Panadería Sandrita',
    timestamp: new Date().toISOString(),
  });
}
