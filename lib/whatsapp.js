// lib/whatsapp.js
// Generador de link de WhatsApp con resumen del pedido para el dueño

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
 * Obtiene la fecha y hora actual en formato Argentina (GMT-3)
 * @returns {string} - Ejemplo: "07/06/2026 17:02"
 */
function fechaHoraArgentina() {
  return new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Genera la URL de WhatsApp con el resumen completo del pedido
 * @param {Object} pedido - Datos del pedido validados
 * @returns {string} - URL completa de wa.me
 */
export function generarLinkWhatsApp(pedido) {
  const {
    nombre,
    telefono,
    email,
    producto,
    fecha_retiro,
    tipo_entrega,
    direccion_envio,
    mensaje,
  } = pedido;

  const tipoEntregaTexto = tipo_entrega === 'envio' ? '🏠 Envío a domicilio' : '🏪 Retiro en local';

  // Construir el mensaje línea por línea
  let texto = `🥐 *Nuevo pedido - Panadería Sandrita*\n`;
  texto += `────────────────────────\n`;
  texto += `👤 *Cliente:* ${nombre}\n`;
  texto += `📞 *Teléfono:* ${telefono}\n`;
  texto += `📧 *Email:* ${email}\n`;
  texto += `────────────────────────\n`;
  texto += `🛍️ *Producto:* ${producto}\n`;
  texto += `📅 *Fecha de retiro/entrega:* ${formatearFecha(fecha_retiro)}\n`;
  texto += `🚚 *Tipo:* ${tipoEntregaTexto}\n`;

  if (tipo_entrega === 'envio' && direccion_envio) {
    texto += `📍 *Dirección:* ${direccion_envio}\n`;
  }

  if (mensaje && mensaje.trim()) {
    texto += `────────────────────────\n`;
    texto += `📝 *Nota adicional:* ${mensaje.trim()}\n`;
  }

  texto += `────────────────────────\n`;
  texto += `🕐 *Pedido recibido:* ${fechaHoraArgentina()}\n`;
  texto += `_Enviado automáticamente desde el sitio web_`;

  const numeroWhatsApp = process.env.OWNER_WHATSAPP;
  const mensajeCodificado = encodeURIComponent(texto);

  return `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
}
