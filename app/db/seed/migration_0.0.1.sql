CREATE SCHEMA IF NOT EXISTS sistema;

SET search_path = sistema;

CREATE TABLE sistema.sistema_versiones (
    nro_version character varying(10) NOT NULL,
    fecha_version timestamp with time zone NOT NULL DEFAULT NOW() unique,
    CONSTRAINT pk_sistema_versiones PRIMARY KEY (nro_version)
);

INSERT INTO sistema.sistema_versiones (nro_version, fecha_version) VALUES ('0.0.1', '2024-01-01 00:00:00');

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    fecha_alta TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posteos (
    id SERIAL PRIMARY KEY,
    contenido TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    reposts INTEGER DEFAULT 0,
    fecha_hora TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER NOT NULL,
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id) 
        REFERENCES usuarios (id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_usuario_nombre ON usuarios (nombre);
CREATE INDEX IF NOT EXISTS idx_posteo_usuario ON posteos (usuario_id);
