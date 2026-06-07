-- Script SQL para crear la tabla de pedidos en Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query

-- Extensión para generar UUIDs automáticamente
create extension if not exists "uuid-ossp";

-- Tabla principal de pedidos
create table if not exists pedidos (
  id               uuid        primary key default uuid_generate_v4(),
  nombre           text        not null,
  telefono         text        not null,
  email            text        not null,
  producto         text        not null,
  fecha_retiro     date        not null,
  tipo_entrega     text        not null default 'retiro',
  direccion_envio  text,
  mensaje          text,
  estado           text        not null default 'pendiente',
  created_at       timestamptz default now()
);

-- Índice para buscar pedidos por fecha (útil para el panel del dueño)
create index if not exists idx_pedidos_fecha_retiro on pedidos (fecha_retiro);

-- Índice para filtrar por estado (pendiente, confirmado, entregado, cancelado)
create index if not exists idx_pedidos_estado on pedidos (estado);

-- Comentarios en columnas para documentación
comment on column pedidos.tipo_entrega    is 'Valores válidos: retiro | envio';
comment on column pedidos.estado          is 'Valores válidos: pendiente | confirmado | entregado | cancelado';
comment on column pedidos.direccion_envio is 'Solo requerido cuando tipo_entrega = envio';
