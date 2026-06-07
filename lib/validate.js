// lib/validate.js
// Validación de campos del formulario de pedidos

/**
 * Valida un campo de email con una expresión regular básica
 * @param {string} email
 * @returns {boolean}
 */
function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida que la fecha de retiro sea una fecha válida y no sea anterior a hoy
 * @param {string} fecha - formato YYYY-MM-DD
 * @returns {boolean}
 */
function esFechaValida(fecha) {
  if (!fecha) return false;
  const fechaPedido = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Ignorar horas para comparar solo días
  return fechaPedido >= hoy && !isNaN(fechaPedido.getTime());
}

/**
 * Valida todos los campos requeridos de un pedido
 * @param {Object} datos - Cuerpo del pedido recibido
 * @returns {{ valido: boolean, error: string|null }}
 */
export function validarPedido(datos) {
  const { nombre, telefono, email, producto, fecha_retiro, tipo_entrega, direccion_envio } = datos;

  // Campos obligatorios básicos
  if (!nombre || nombre.trim().length < 2) {
    return { valido: false, error: 'El nombre es requerido y debe tener al menos 2 caracteres.' };
  }

  if (!telefono || telefono.trim().length < 7) {
    return { valido: false, error: 'El teléfono es requerido y debe ser válido.' };
  }

  if (!email || !esEmailValido(email.trim())) {
    return { valido: false, error: 'El email es requerido y debe tener un formato válido.' };
  }

  if (!producto || producto.trim().length < 2) {
    return { valido: false, error: 'El producto solicitado es requerido.' };
  }

  if (!fecha_retiro || !esFechaValida(fecha_retiro)) {
    return { valido: false, error: 'La fecha de retiro es requerida y no puede ser anterior a hoy.' };
  }

  // Si el tipo de entrega es envío a domicilio, la dirección es obligatoria
  if (tipo_entrega === 'envio' && (!direccion_envio || direccion_envio.trim().length < 5)) {
    return { valido: false, error: 'La dirección de envío es requerida para pedidos a domicilio.' };
  }

  return { valido: true, error: null };
}
