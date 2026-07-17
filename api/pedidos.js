// api/pedidos.js
// Función serverless principal: recibe pedidos, los guarda en Supabase,
// genera el link de WhatsApp para el dueño y envía email de confirmación al cliente.

import { supabase } from '../lib/supabase.js';
import { validarPedido } from '../lib/validate.js';
import { generarLinkWhatsApp } from '../lib/whatsapp.js';
import { enviarEmailConfirmacion } from '../lib/email.js';

/**
 * POST /api/pedidos
 * Procesa un nuevo pedido del formulario web de Sandrita
 *
 * Body esperado (JSON):
 * {
 *   nombre:         string  (requerido)
 *   telefono:       string  (requerido)
 *   email:          string  (requerido)
 *   producto:       string  (requerido)
 *   fecha_retiro:   string  YYYY-MM-DD (requerido)
 *   tipo_entrega:   string  "retiro" | "envio" (opcional, default "retiro")
 *   direccion_envio:string  (requerido si tipo_entrega === "envio")
 *   mensaje:        string  (opcional, comentarios adicionales)
 * }
 *
 * Respuesta exitosa:
 * { success: true, pedidoId: uuid, whatsappUrl: string }
 *
 * Respuesta de error:
 * { success: false, error: string }
 */
export default async function handler(req, res) {

  // Asegurar codificación UTF-8 en las respuestas
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // ─── 1. Manejo de preflight CORS (OPTIONS) ────────────────────────────────
  if (req.method === 'OPTIONS') {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).end();
  }

  // ─── 2. Solo aceptar POST ─────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método no permitido. Usá POST para enviar pedidos.',
    });
  }

  try {
    // ─── 3. Extraer y normalizar datos del body ─────────────────────────────
    const {
      nombre,
      telefono,
      email,
      producto,
      fecha_retiro,
      tipo_entrega = 'retiro',
      direccion_envio,
      mensaje,
      user_id,
    } = req.body;

    const datosPedido = {
      nombre:          nombre?.trim(),
      telefono:        telefono?.trim(),
      email:           email?.trim().toLowerCase(),
      producto:        producto?.trim(),
      fecha_retiro,
      tipo_entrega,
      direccion_envio: direccion_envio?.trim() || null,
      mensaje:         mensaje?.trim() || null,
      user_id:         user_id || null,
    };

    // ─── 4. Validar campos requeridos ────────────────────────────────────────
    const { valido, error: errorValidacion } = validarPedido(datosPedido);

    if (!valido) {
      console.warn('[Pedidos] Validación fallida:', errorValidacion);
      return res.status(400).json({
        success: false,
        error: errorValidacion,
      });
    }

    // ─── 5. Guardar pedido en Supabase ───────────────────────────────────────
    const { data: pedidoGuardado, error: errorSupabase } = await supabase
      .from('pedidos')
      .insert([
        {
          nombre:          datosPedido.nombre,
          telefono:        datosPedido.telefono,
          email:           datosPedido.email,
          producto:        datosPedido.producto,
          fecha_retiro:    datosPedido.fecha_retiro,
          tipo_entrega:    datosPedido.tipo_entrega,
          direccion_envio: datosPedido.direccion_envio,
          mensaje:         datosPedido.mensaje,
          user_id:         datosPedido.user_id,
          estado:          'pendiente',
        },
      ])
      .select('id')
      .single();

    if (errorSupabase) {
      console.error('[Pedidos] Error al guardar en Supabase:', errorSupabase);
      return res.status(500).json({
        success: false,
        error: `Error interno del servidor al guardar el pedido: ${errorSupabase.message || JSON.stringify(errorSupabase)}`,
      });
    }

    const pedidoId = pedidoGuardado.id;
    console.log(`[Pedidos] Pedido guardado en Supabase con ID: ${pedidoId}`);

    // ─── 6. Generar link de WhatsApp para el dueño ───────────────────────────
    const whatsappUrl = generarLinkWhatsApp(datosPedido);
    console.log('[Pedidos] Link de WhatsApp generado correctamente.');

    // ─── 7. Enviar email de confirmación al cliente ──────────────────────────
    // No bloqueamos la respuesta si el email falla: el pedido YA fue guardado.
    const { ok: emailOk, error: errorEmail } = await enviarEmailConfirmacion(datosPedido);

    if (!emailOk) {
      // Loguear el error pero no fallar la respuesta al cliente
      console.warn('[Pedidos] El email de confirmación no pudo enviarse:', errorEmail);
    } else {
      console.log(`[Pedidos] Email de confirmación enviado a ${datosPedido.email}`);
    }

    // ─── 8. Respuesta exitosa ────────────────────────────────────────────────
    return res.status(200).json({
      success:     true,
      pedidoId,
      whatsappUrl,
      emailEnviado: emailOk,
    });

  } catch (err) {
    // Error inesperado no capturado
    console.error('[Pedidos] Error inesperado:', err);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor. Intentá de nuevo más tarde.',
    });
  }
}
