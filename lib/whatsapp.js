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

  const tipoTexto = tipo_entrega === 'envio' ? 'Entrega a domicilio' : 'Retiro en local';

  // Construir el mensaje línea por línea con el formato exacto requerido
  let texto = `🥖 Nuevo pedido - Panadería Sandrita\n`;
  texto += `────────────────────────\n`;
  texto += `👤 Cliente: ${nombre}\n`;
  texto += `📞 Teléfono: ${telefono}\n`;
  texto += `📧 Email: ${email}\n`;
  texto += `────────────────────────\n`;
  texto += `🛍️ Producto: ${producto}\n`;
  texto += `📅 Fecha de retiro/entrega: ${formatearFecha(fecha_retiro)}\n`;
  texto += `🏠 Tipo: ${tipoTexto}\n`;

  if (tipo_entrega === 'envio' && direccion_envio) {
    texto += `📍 Dirección: ${direccion_envio}\n`;
  }

  if (mensaje && mensaje.trim()) {
    texto += `────────────────────────\n`;
    texto += `📝 Comentarios/Indicaciones: ${mensaje.trim()}\n`;
  }

  texto += `────────────────────────\n`;
  texto += `🕐 Pedido recibido: ${fechaHoraArgentina()}\n`;
  texto += `🌐 Enviado automáticamente desde el sitio web`;

  const numeroWhatsApp = process.env.OWNER_WHATSAPP;
  const mensajeCodificado = encodeURIComponent(texto);

  return `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
}
