// lib/email.js
// Envío de email de confirmación al cliente usando Resend

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Formatea una fecha al estilo argentino dd/mm/yyyy
 * @param {string} fechaISO - Fecha en formato YYYY-MM-DD
 * @returns {string}
 */
function formatearFecha(fechaISO) {
  if (!fechaISO) return 'Sin especificar';
  const [anio, mes, dia] = fechaISO.split('-');
  return `${dia}/${mes}/${anio}`;
}

/**
 * Genera el HTML del email de confirmación al cliente
 * @param {Object} pedido - Datos del pedido
 * @returns {string} - HTML listo para enviar
 */
function generarHtmlEmail(pedido) {
  const { nombre, producto, fecha_retiro, tipo_entrega, direccion_envio, mensaje } = pedido;

  const tipoEntregaTexto =
    tipo_entrega === 'envio' ? '🏠 Envío a domicilio' : '🏪 Retiro en local (Rivadavia 907, San Luis)';

  const filasDireccion =
    tipo_entrega === 'envio' && direccion_envio
      ? `<tr>
          <td style="padding: 8px 0; color: #555; font-weight: bold;">📍 Dirección de envío</td>
          <td style="padding: 8px 0; color: #333;">${direccion_envio}</td>
        </tr>`
      : '';

  const filasNota =
    mensaje && mensaje.trim()
      ? `<tr>
          <td style="padding: 8px 0; color: #555; font-weight: bold;">📝 Nota adicional</td>
          <td style="padding: 8px 0; color: #333;">${mensaje.trim()}</td>
        </tr>`
      : '';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de pedido - Sandrita</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 600px;">
          
          <!-- Encabezado con logo/marca -->
          <tr>
            <td style="background-color: #8B4513; padding: 36px 40px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 28px;">🥐</p>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 1px;">
                Panadería y Confitería Sandrita
              </h1>
              <p style="margin: 8px 0 0 0; color: #f0d9c8; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">
                Artesanal desde siempre
              </p>
            </td>
          </tr>

          <!-- Cuerpo principal -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h2 style="margin: 0 0 16px 0; color: #8B4513; font-size: 22px;">
                ✅ ¡Recibimos tu pedido, ${nombre}!
              </h2>
              <p style="margin: 0 0 24px 0; color: #444; font-size: 15px; line-height: 1.6;">
                Gracias por elegirnos. Tu pedido fue registrado con éxito.
                <strong>Te contactaremos pronto para confirmar los detalles y acordar el pago.</strong>
              </p>

              <!-- Resumen del pedido -->
              <div style="background-color: #fdf7f2; border-left: 4px solid #8B4513; border-radius: 6px; padding: 20px 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #8B4513; font-size: 15px; text-transform: uppercase; letter-spacing: 1px;">
                  Resumen del pedido
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 45%;">🛍️ Producto</td>
                    <td style="padding: 8px 0; color: #333;">${producto}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">📅 Fecha de retiro</td>
                    <td style="padding: 8px 0; color: #333;">${formatearFecha(fecha_retiro)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">🚚 Modalidad</td>
                    <td style="padding: 8px 0; color: #333;">${tipoEntregaTexto}</td>
                  </tr>
                  ${filasDireccion}
                  ${filasNota}
                </table>
              </div>

              <!-- Mensaje de contacto -->
              <div style="background-color: #fffbe6; border: 1px solid #f0d060; border-radius: 6px; padding: 16px 20px; margin-bottom: 28px;">
                <p style="margin: 0; color: #7a6000; font-size: 14px; line-height: 1.5;">
                  ⏳ <strong>Tiempo de respuesta:</strong> Nos comunicaremos con vos en las próximas horas para confirmar el pedido y coordinar el pago. Si necesitás contactarnos antes, escribinos por WhatsApp.
                </p>
              </div>

              <!-- Botón WhatsApp -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="https://wa.me/${process.env.OWNER_WHATSAPP}" 
                   style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: bold;">
                  💬 Escribinos por WhatsApp
                </a>
              </div>
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="background-color: #f7f0e8; padding: 24px 40px; text-align: center; border-top: 1px solid #e8ddd0;">
              <p style="margin: 0 0 6px 0; color: #8B4513; font-size: 14px; font-weight: bold;">
                📍 Rivadavia 907, San Luis Capital
              </p>
              <p style="margin: 0; color: #888; font-size: 13px;">
                Instagram: 
                <a href="https://instagram.com/panaderia_sandrita" style="color: #8B4513; text-decoration: none;">
                  @panaderia_sandrita
                </a>
              </p>
              <p style="margin: 12px 0 0 0; color: #bbb; font-size: 11px;">
                Este email fue generado automáticamente. Por favor no respondas a este mensaje.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function enviarEmailConfirmacion(pedido) {
  const { nombre, email } = pedido;
  const htmlPedido = generarHtmlEmail(pedido);

  try {
    console.log(`[Email] Intentando enviar email de confirmación a ${email} usando Resend...`);
    const { data, error } = await resend.emails.send({
      from: 'Panadería Sandrita <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmación de tu pedido - Sandrita',
      html: htmlPedido
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: error.message || JSON.stringify(error) };
    } else {
      console.log('Email enviado:', data);
      return { ok: true, data };
    }
  } catch (err) {
    console.error('Fallo el envío de email:', err);
    return { ok: false, error: err.message || err };
  }
}

/**
 * Genera el HTML del email de alerta para el administrador
 * @param {Object} pedido - Datos del pedido
 * @returns {string} - HTML listo para enviar
 */
function generarHtmlAlertaAdmin(pedido) {
  const { nombre, telefono, email, producto, fecha_retiro, tipo_entrega, direccion_envio, mensaje } = pedido;

  const tipoEntregaTexto =
    tipo_entrega === 'envio' ? '🏠 Envío a domicilio' : '🏪 Retiro en local (Rivadavia 907, San Luis)';

  const filasDireccion =
    tipo_entrega === 'envio' && direccion_envio
      ? `<tr>
          <td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">📍 Dirección de envío</td>
          <td style="padding: 8px 0; color: #333;">${direccion_envio}</td>
        </tr>`
      : '';

  const filasNota =
    mensaje && mensaje.trim()
      ? `<tr>
          <td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">📝 Notas del cliente</td>
          <td style="padding: 8px 0; color: #333;">${mensaje.trim()}</td>
        </tr>`
      : '';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta - Nuevo pedido recibido</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 600px;">
          
          <!-- Encabezado de Alerta Interna -->
          <tr>
            <td style="background-color: #d97706; padding: 24px 30px; text-align: left;">
              <span style="background-color: #ffffff; color: #d97706; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
                🔔 Alerta Interna de Administración
              </span>
              <h1 style="margin: 12px 0 0 0; color: #ffffff; font-size: 22px; font-weight: bold;">
                ¡Nuevo Pedido Recibido!
              </h1>
            </td>
          </tr>

          <!-- Cuerpo principal -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 15px; line-height: 1.5;">
                Se ha registrado un nuevo pedido desde el sitio web. A continuación se detallan los datos del cliente y del pedido:
              </p>

              <!-- Datos del Cliente -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  👤 Datos del Cliente
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280; font-weight: bold; width: 40%;">Cliente:</td>
                    <td style="padding: 6px 0; color: #111827; font-weight: bold;">${nombre}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Teléfono:</td>
                    <td style="padding: 6px 0; color: #111827;">
                      <a href="tel:${telefono}" style="color: #2563eb; text-decoration: none;">${telefono}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #6b7280; font-weight: bold;">Email:</td>
                    <td style="padding: 6px 0; color: #111827;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Detalle del Pedido -->
              <div style="background-color: #fffbe6; border-left: 4px solid #d97706; border-radius: 6px; padding: 18px 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  📦 Detalle del Pedido
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">🛍️ Producto(s)</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: bold;">${producto}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">📅 Fecha de entrega/retiro</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: bold;">${formatearFecha(fecha_retiro)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">🚚 Modalidad</td>
                    <td style="padding: 8px 0; color: #111827;">${tipoEntregaTexto}</td>
                  </tr>
                  ${filasDireccion}
                  ${filasNota}
                </table>
              </div>

              <!-- Acciones rápidas -->
              <div style="text-align: center; margin-top: 24px;">
                <a href="https://wa.me/549${telefono.replace(/\D/g, '')}" 
                   style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: bold;">
                  💬 Contactar al cliente por WhatsApp
                </a>
              </div>
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="background-color: #f3f4f6; padding: 16px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Notificación automática del sistema — Panadería y Confitería Sandrita
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Envía un email de alerta al administrador cuando se crea un nuevo pedido
 * @param {Object} pedido - Datos del pedido
 * @returns {Promise<{ok: boolean, data?: Object, error?: string}>}
 */
export async function enviarAlertaAdmin(pedido) {
  const adminEmail = process.env.OWNER_EMAIL;

  if (!adminEmail) {
    console.warn('[Email Admin] No se definió OWNER_EMAIL en las variables de entorno. Omitiendo alerta por mail.');
    return { ok: false, error: 'OWNER_EMAIL no configurado' };
  }

  const htmlAlerta = generarHtmlAlertaAdmin(pedido);

  try {
    console.log(`[Email Admin] Enviando alerta de nuevo pedido a ${adminEmail}...`);
    const { data, error } = await resend.emails.send({
      from: 'Panadería Sandrita <onboarding@resend.dev>',
      to: adminEmail,
      subject: '🔔 Nuevo pedido recibido — Sandrita',
      html: htmlAlerta,
    });

    if (error) {
      console.error('[Email Admin] Error en Resend al enviar alerta:', error);
      return { ok: false, error: error.message || JSON.stringify(error) };
    } else {
      console.log('[Email Admin] Alerta de pedido enviada al administrador:', data);
      return { ok: true, data };
    }
  } catch (err) {
    console.error('[Email Admin] Falló el envío de la alerta de email:', err);
    return { ok: false, error: err.message || err };
  }
}

